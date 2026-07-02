const REDIRECT_STORAGE_KEY = "auth_redirect_target:v1";
const AUTH_BRIDGE_PARAM =
  import.meta.env.VITE_AUTH_BRIDGE_PARAM || "auth_bridge";

const DEFAULT_ALLOWED_REDIRECT_ORIGINS = [
  "http://localhost:5173",
  window.location.origin,
];

function getAllowedRedirectOrigins() {
  const envValue = import.meta.env.VITE_ALLOWED_AUTH_REDIRECT_ORIGINS || "";

  const envOrigins = envValue
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  return Array.from(
    new Set([...DEFAULT_ALLOWED_REDIRECT_ORIGINS, ...envOrigins])
  );
}

function encodeBase64Url(payload) {
  const jsonValue = JSON.stringify(payload);
  const bytes = new TextEncoder().encode(jsonValue);

  let binaryValue = "";

  for (const byte of bytes) {
    binaryValue += String.fromCharCode(byte);
  }

  return window
    .btoa(binaryValue)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

export function normalizeAuthRedirectTarget(value) {
  if (!value) return "";

  try {
    const targetUrl = new URL(value, window.location.origin);
    const allowedOrigins = getAllowedRedirectOrigins();

    if (!allowedOrigins.includes(targetUrl.origin)) {
      return "";
    }

    return targetUrl.toString();
  } catch {
    return "";
  }
}

export function getAuthRedirectFromLocation(location = window.location) {
  const searchParams = new URLSearchParams(location.search || "");
  return normalizeAuthRedirectTarget(searchParams.get("redirect"));
}

export function captureAuthRedirectFromLocation(location = window.location) {
  const redirectTarget = getAuthRedirectFromLocation(location);

  if (!redirectTarget) {
    return "";
  }

  sessionStorage.setItem(REDIRECT_STORAGE_KEY, redirectTarget);

  return redirectTarget;
}

export function getStoredAuthRedirectTarget() {
  return normalizeAuthRedirectTarget(
    sessionStorage.getItem(REDIRECT_STORAGE_KEY) || ""
  );
}

export function clearStoredAuthRedirectTarget() {
  sessionStorage.removeItem(REDIRECT_STORAGE_KEY);
}

export function hasStoredAuthRedirectTarget() {
  return Boolean(getStoredAuthRedirectTarget());
}

export function isExternalRedirectTarget(value) {
  if (!value) return false;

  try {
    const targetUrl = new URL(value, window.location.origin);
    return targetUrl.origin !== window.location.origin;
  } catch {
    return false;
  }
}

export function buildAuthBridgeRedirectUrl({ redirectUrl, session }) {
  const safeRedirectUrl = normalizeAuthRedirectTarget(redirectUrl);

  if (!safeRedirectUrl) {
    return "";
  }

  const targetUrl = new URL(safeRedirectUrl);

  const payload = {
    token: session?.token || "",
    refreshToken: session?.refreshToken || "",
    tokenType: session?.tokenType || "bearer",
    user: session?.user || null,
    issuedAt: Date.now(),
    source: "login_universal_frontend",
  };

  if (!payload.token) {
    return "";
  }

  const encodedPayload = encodeBase64Url(payload);

  const hashValue = targetUrl.hash?.startsWith("#")
    ? targetUrl.hash.slice(1)
    : targetUrl.hash || "";

  const hashParams = new URLSearchParams(hashValue);

  hashParams.set(AUTH_BRIDGE_PARAM, encodedPayload);

  targetUrl.hash = hashParams.toString();

  return targetUrl.toString();
}