import axios from "axios";

import {
  clearAuthSession,
  clearPendingTwoFactorChallenge,
  clearPostLoginWelcomeFlag,
  getStoredAuthSession,
  persistAuthSession,
} from "../utils/storage";

import {
  SESSION_INACTIVITY_REASON,
  broadcastSessionInactivityLogout,
  markSessionActivity,
} from "../utils/sessionInactivity";

import endpoints from "./endpoints";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

const AUTH_API_URL =
  import.meta.env.VITE_AUTH_API_URL || "http://127.0.0.1:8001";

const BACKEND_INACTIVITY_CODE = "SESSION_EXPIRED_INACTIVITY";

const PUBLIC_AUTH_ENDPOINTS = [
  "/auth/login",
  "/auth/setup",
  "/auth/enable",
  "/auth/login/2fa",
  "/auth/refresh",
  "/auth/logout",
  "/auth/exchange-code",
  "/auth/restablecer-password",
];

const AUTH_FLOW_PAGES = ["/login", "/auth/verificacion-2fa"];

const TEMP_2FA_STORAGE_KEYS = [
  "temp_2fa_user_id",
  "temp_2fa_token",
  "temp_2fa_status",
  "temp_2fa_expires_at",
];

let refreshRequestPromise = null;
let backendInactivityLogoutStarted = false;

const api = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  withCredentials: false,
});

function getRequestPathname(url = "") {
  try {
    return new URL(url, API_URL).pathname;
  } catch {
    return url;
  }
}

function isPublicAuthEndpoint(url = "") {
  const pathname = getRequestPathname(url);
  return PUBLIC_AUTH_ENDPOINTS.includes(pathname);
}

function isAuthServiceEndpoint(url = "") {
  const pathname = getRequestPathname(url);

  return (
    pathname.startsWith("/auth/") ||
    pathname === "/users" ||
    pathname === "/users/me" ||
    pathname === "/users/catalogo-permisos" ||
    pathname.startsWith("/users/")
  );
}

function clearLocalTwoFactorTempSession() {
  for (const key of TEMP_2FA_STORAGE_KEYS) {
    localStorage.removeItem(key);
  }
}

function isCurrentAuthFlowPage() {
  return AUTH_FLOW_PAGES.includes(window.location.pathname);
}

function normalizeRefreshSessionPayload(payload) {
  const token =
    payload?.access_token || payload?.token || payload?.accessToken || "";

  const refreshToken =
    payload?.refresh_token || payload?.refreshToken || payload?.refresh || "";

  const tokenType = payload?.token_type || payload?.tokenType || "bearer";

  if (!token) {
    return null;
  }

  return {
    token,
    refreshToken,
    tokenType,
  };
}

function clearFrontendAuthState() {
  clearAuthSession();
  clearPendingTwoFactorChallenge();
  clearPostLoginWelcomeFlag();
  clearLocalTwoFactorTempSession();
}

function redirectToLoginIfNeeded() {
  if (!isCurrentAuthFlowPage()) {
    window.location.replace("/login");
  }
}

function redirectToLoginByBackendInactivity() {
  const loginUrl = new URL("/login", window.location.origin);

  loginUrl.searchParams.set("reason", SESSION_INACTIVITY_REASON);

  window.location.replace(`${loginUrl.pathname}${loginUrl.search}`);
}

function getBackendErrorCode(error) {
  return String(error?.response?.data?.code || "");
}

function isBackendInactivityError(error) {
  return (
    error?.response?.status === 401 &&
    getBackendErrorCode(error) === BACKEND_INACTIVITY_CODE
  );
}

function handleBackendInactivityLogout() {
  if (backendInactivityLogoutStarted) return;

  backendInactivityLogoutStarted = true;

  clearFrontendAuthState();
  broadcastSessionInactivityLogout();
  redirectToLoginByBackendInactivity();
}

function shouldMarkSessionActivityFromResponse(response) {
  const requestUrl = response?.config?.url || "";
  const pathname = getRequestPathname(requestUrl);

  if (pathname === "/auth/refresh") {
    return true;
  }

  return Boolean(response?.config?.sessionActivityRequest);
}

async function requestTokenRefresh(refreshToken) {
  if (!refreshRequestPromise) {
    refreshRequestPromise = api
      .post(
        endpoints.auth.refresh,
        {
          refresh_token: refreshToken || "",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          skipAuthRefresh: true,
        }
      )
      .then((response) => normalizeRefreshSessionPayload(response.data))
      .finally(() => {
        refreshRequestPromise = null;
      });
  }

  return refreshRequestPromise;
}

api.interceptors.request.use(
  (config) => {
    const { token } = getStoredAuthSession();

    const requestUrl = config.url || "";
    const shouldUseAuthService = isAuthServiceEndpoint(requestUrl);
    const isPublicAuthRequest = isPublicAuthEndpoint(requestUrl);

    config.baseURL = shouldUseAuthService ? AUTH_API_URL : API_URL;

    if (token && !isPublicAuthRequest) {
      config.headers.Authorization = `Bearer ${token}`;
      config.sessionActivityRequest = true;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    if (shouldMarkSessionActivityFromResponse(response)) {
      markSessionActivity();
    }

    return response;
  },
  async (error) => {
    if (isBackendInactivityError(error)) {
      handleBackendInactivityLogout();
      return Promise.reject(error);
    }

    const status = error?.response?.status;
    const originalRequest = error?.config || {};
    const requestUrl = originalRequest.url || "";

    const isAuthRequest = isPublicAuthEndpoint(requestUrl);
    const shouldSkipRefresh = Boolean(originalRequest.skipAuthRefresh);
    const alreadyRetried = Boolean(originalRequest.authRetry);

    if (
      status === 401 &&
      !isAuthRequest &&
      !shouldSkipRefresh &&
      !alreadyRetried
    ) {
      const { refreshToken, user } = getStoredAuthSession();

      if (refreshToken) {
        try {
          const refreshedSession = await requestTokenRefresh(refreshToken);

          if (!refreshedSession?.token) {
            throw new Error("No se recibió un access_token válido en /refresh.");
          }

          const nextRefreshToken =
            refreshedSession.refreshToken || refreshToken;

          persistAuthSession({
            token: refreshedSession.token,
            refreshToken: nextRefreshToken,
            tokenType: refreshedSession.tokenType || "bearer",
            user: user || null,
          });

          originalRequest.authRetry = true;
          originalRequest.headers = originalRequest.headers || {};
          originalRequest.headers.Authorization = `Bearer ${refreshedSession.token}`;

          return api(originalRequest);
        } catch (refreshError) {
          clearFrontendAuthState();

          if (isBackendInactivityError(refreshError)) {
            handleBackendInactivityLogout();
          } else {
            redirectToLoginIfNeeded();
          }

          return Promise.reject(refreshError);
        }
      }

      clearFrontendAuthState();
      redirectToLoginIfNeeded();
    }

    if (status === 403 && !isAuthRequest) {
      clearFrontendAuthState();
      redirectToLoginIfNeeded();
    }

    return Promise.reject(error);
  }
);

export default api;
