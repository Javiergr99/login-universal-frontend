const REDIRECT_STORAGE_KEY = "auth_redirect_target:v1";

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

export function getCleanRedirectUrl(value) {
  const safeRedirectUrl = normalizeAuthRedirectTarget(value);

  if (!safeRedirectUrl) {
    return "";
  }

  const targetUrl = new URL(safeRedirectUrl);

  targetUrl.search = "";
  targetUrl.hash = "";

  return targetUrl.toString();
}

export function buildRedirectCodeUrl({ redirectUrl, code }) {
  const cleanRedirectUrl = getCleanRedirectUrl(redirectUrl);

  if (!cleanRedirectUrl || !code) {
    return "";
  }

  const targetUrl = new URL(cleanRedirectUrl);

  targetUrl.searchParams.set("code", code);

  return targetUrl.toString();
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
