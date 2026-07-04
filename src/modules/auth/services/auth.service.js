import api from "../../../api/http";
import endpoints from "../../../api/endpoints";

const TOKEN_KEY = "token";
const REFRESH_TOKEN_KEY = "refresh_token";
const TOKEN_TYPE_KEY = "token_type";
const USER_KEY = "auth_user";

const TEMP_2FA_TOKEN_KEY = "temp_2fa_token";
const TEMP_2FA_LEGACY_USER_ID_KEY = "temp_2fa_user_id";
const TEMP_2FA_STATUS_KEY = "temp_2fa_status";
const TEMP_2FA_EXPIRES_AT_KEY = "temp_2fa_expires_at";

const TEMP_2FA_SESSION_TTL_MS = 10 * 60 * 1000;

const VALID_TEMP_2FA_STATUSES = ["pending_setup", "pending_2fa"];

export function saveAuthToken(token) {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
    return;
  }

  localStorage.removeItem(TOKEN_KEY);
}

export function saveRefreshToken(refreshToken) {
  if (refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    return;
  }

  localStorage.removeItem(REFRESH_TOKEN_KEY);
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function saveTokenType(tokenType = "bearer") {
  if (tokenType) {
    localStorage.setItem(TOKEN_TYPE_KEY, tokenType);
    return;
  }

  localStorage.removeItem(TOKEN_TYPE_KEY);
}

export function saveAuthUser(user) {
  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    return;
  }

  localStorage.removeItem(USER_KEY);
}

export function clearAuthSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(TOKEN_TYPE_KEY);
  localStorage.removeItem(USER_KEY);
}

function isValidTempTwoFactorStatus(status) {
  return VALID_TEMP_2FA_STATUSES.includes(String(status || ""));
}

function getTwoFactorExpirationTimestamp() {
  return Date.now() + TEMP_2FA_SESSION_TTL_MS;
}

function isExpiredTwoFactorTempSession(expiresAt) {
  const expirationTimestamp = Number(expiresAt);

  if (!Number.isFinite(expirationTimestamp)) {
    return true;
  }

  return Date.now() > expirationTimestamp;
}

export function saveTwoFactorTempSession({ tempToken, status }) {
  if (!tempToken || !isValidTempTwoFactorStatus(status)) {
    clearTwoFactorTempSession();
    return;
  }

  localStorage.setItem(TEMP_2FA_TOKEN_KEY, String(tempToken));
  localStorage.setItem(TEMP_2FA_STATUS_KEY, String(status));
  localStorage.setItem(
    TEMP_2FA_EXPIRES_AT_KEY,
    String(getTwoFactorExpirationTimestamp())
  );

  localStorage.removeItem(TEMP_2FA_LEGACY_USER_ID_KEY);
}

export function getTwoFactorTempSession() {
  const tempToken = localStorage.getItem(TEMP_2FA_TOKEN_KEY);
  const status = localStorage.getItem(TEMP_2FA_STATUS_KEY);
  const expiresAt = localStorage.getItem(TEMP_2FA_EXPIRES_AT_KEY);

  const hasRequiredData =
    Boolean(tempToken) && isValidTempTwoFactorStatus(status);

  if (!hasRequiredData || isExpiredTwoFactorTempSession(expiresAt)) {
    clearTwoFactorTempSession();
    return null;
  }

  return {
    tempToken,
    status,
    expiresAt: Number(expiresAt),
  };
}

export function hasValidTwoFactorTempSession() {
  return Boolean(getTwoFactorTempSession());
}

export function clearTwoFactorTempSession() {
  localStorage.removeItem(TEMP_2FA_TOKEN_KEY);
  localStorage.removeItem(TEMP_2FA_LEGACY_USER_ID_KEY);
  localStorage.removeItem(TEMP_2FA_STATUS_KEY);
  localStorage.removeItem(TEMP_2FA_EXPIRES_AT_KEY);
}

function normalizeCode(code) {
  return String(code || "")
    .replace(/\D/g, "")
    .slice(0, 6);
}

function normalizeTempToken(tempToken) {
  return String(tempToken || "").trim();
}

function normalizeRedirectCode(code) {
  return String(code || "").trim();
}

export async function loginRequest({ curp, password }) {
  const params = new URLSearchParams();

  params.append("username", curp?.trim().toUpperCase() || "");
  params.append("password", password || "");

  const response = await api.post(endpoints.auth.login, params, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return response.data;
}

export async function getCurrentUserProfile() {
  const response = await api.get(endpoints.auth.me);
  return response.data;
}

export async function fetchTwoFactorSetupQr({ tempToken }) {
  const response = await api.post(
    endpoints.auth.setupTwoFactor,
    {
      temp_token: normalizeTempToken(tempToken),
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
      responseType: "blob",
    }
  );

  return response.data;
}

export async function enableTwoFactorRequest({ tempToken, code }) {
  const response = await api.post(
    endpoints.auth.enableTwoFactor,
    {
      temp_token: normalizeTempToken(tempToken),
      code: normalizeCode(code),
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
}

export async function verifyTwoFactorRequest({ tempToken, code }) {
  const response = await api.post(
    endpoints.auth.verifyTwoFactor,
    {
      temp_token: normalizeTempToken(tempToken),
      code: normalizeCode(code),
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
}

export async function refreshSessionRequest({ refreshToken }) {
  const response = await api.post(
    endpoints.auth.refresh,
    {
      refresh_token: refreshToken || "",
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
}

export async function logoutRequest({ refreshToken }) {
  const response = await api.post(
    endpoints.auth.logout,
    {
      refresh_token: refreshToken || "",
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
}

export async function createRedirectCodeRequest({ redirectUrl }) {
  const response = await api.post(
    endpoints.auth.redirectCode,
    {
      redirect_url: redirectUrl || "",
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
}

export async function exchangeRedirectCodeRequest({ code }) {
  const response = await api.post(
    endpoints.auth.exchangeCode,
    {
      code: normalizeRedirectCode(code),
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
}
