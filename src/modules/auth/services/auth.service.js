import api from "../../../api/http";
import endpoints from "../../../api/endpoints";

const TOKEN_KEY = "token";
const REFRESH_TOKEN_KEY = "refresh_token";
const TOKEN_TYPE_KEY = "token_type";
const USER_KEY = "auth_user";

const TEMP_2FA_USER_ID_KEY = "temp_2fa_user_id";
const TEMP_2FA_STATUS_KEY = "temp_2fa_status";
const TEMP_2FA_EXPIRES_AT_KEY = "temp_2fa_expires_at";

/**
 * Tiempo máximo de vida para la sesión temporal 2FA.
 *
 * Motivo:
 * Evita que un reto 2FA incompleto quede guardado indefinidamente
 * en localStorage y fuerce redirecciones futuras a la pantalla 2FA.
 */
const TEMP_2FA_SESSION_TTL_MS = 10 * 60 * 1000;

/**
 * Estados válidos que puede devolver el backend después de POST /login.
 */
const VALID_TEMP_2FA_STATUSES = ["pending_setup", "pending_2fa"];

/**
 * Guarda el token final de sesión.
 * Este token solo debe venir de:
 * - POST /enable
 * - POST /login/2fa
 * - POST /refresh
 */
export function saveAuthToken(token) {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
    return;
  }

  localStorage.removeItem(TOKEN_KEY);
}

/**
 * Guarda el refresh token rotatorio actual.
 */
export function saveRefreshToken(refreshToken) {
  if (refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    return;
  }

  localStorage.removeItem(REFRESH_TOKEN_KEY);
}

/**
 * Obtiene el refresh token actual.
 */
export function getRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

/**
 * Guarda el tipo de token.
 */
export function saveTokenType(tokenType = "bearer") {
  if (tokenType) {
    localStorage.setItem(TOKEN_TYPE_KEY, tokenType);
    return;
  }

  localStorage.removeItem(TOKEN_TYPE_KEY);
}

/**
 * Guarda el perfil del usuario autenticado.
 */
export function saveAuthUser(user) {
  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    return;
  }

  localStorage.removeItem(USER_KEY);
}

/**
 * Limpia únicamente la sesión autenticada.
 */
export function clearAuthSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(TOKEN_TYPE_KEY);
  localStorage.removeItem(USER_KEY);
}

/**
 * Valida si un estado temporal 2FA es reconocido por el frontend.
 *
 * @param {string | null | undefined} status
 * @returns {boolean}
 */
function isValidTempTwoFactorStatus(status) {
  return VALID_TEMP_2FA_STATUSES.includes(String(status || ""));
}

/**
 * Calcula la fecha de expiración de la sesión temporal 2FA.
 *
 * @returns {number}
 */
function getTwoFactorExpirationTimestamp() {
  return Date.now() + TEMP_2FA_SESSION_TTL_MS;
}

/**
 * Revisa si una fecha de expiración temporal ya venció.
 *
 * @param {string | null} expiresAt
 * @returns {boolean}
 */
function isExpiredTwoFactorTempSession(expiresAt) {
  const expirationTimestamp = Number(expiresAt);

  if (!Number.isFinite(expirationTimestamp)) {
    return true;
  }

  return Date.now() > expirationTimestamp;
}

/**
 * Guarda datos temporales del flujo 2FA.
 * Se usan después del POST /login.
 *
 * La sesión temporal expira automáticamente para evitar
 * redirecciones indefinidas si el usuario abandona el flujo.
 */
export function saveTwoFactorTempSession({ userId, status }) {
  if (!userId || !isValidTempTwoFactorStatus(status)) {
    clearTwoFactorTempSession();
    return;
  }

  localStorage.setItem(TEMP_2FA_USER_ID_KEY, String(userId));
  localStorage.setItem(TEMP_2FA_STATUS_KEY, String(status));
  localStorage.setItem(
    TEMP_2FA_EXPIRES_AT_KEY,
    String(getTwoFactorExpirationTimestamp())
  );
}

/**
 * Obtiene los datos temporales del flujo 2FA.
 *
 * Esto ayuda si el usuario recarga la pantalla /two-factor,
 * pero si la sesión ya expiró, se limpia y se devuelve null.
 */
export function getTwoFactorTempSession() {
  const userId = localStorage.getItem(TEMP_2FA_USER_ID_KEY);
  const status = localStorage.getItem(TEMP_2FA_STATUS_KEY);
  const expiresAt = localStorage.getItem(TEMP_2FA_EXPIRES_AT_KEY);

  const hasRequiredData = Boolean(userId) && isValidTempTwoFactorStatus(status);

  if (!hasRequiredData || isExpiredTwoFactorTempSession(expiresAt)) {
    clearTwoFactorTempSession();
    return null;
  }

  return {
    userId,
    status,
    expiresAt: Number(expiresAt),
  };
}

/**
 * Indica si existe un reto 2FA temporal válido.
 *
 * Centraliza la validación para evitar repetir esta lógica
 * en ProtectedRoute, PublicRoute y PendingTwoFactorRoute.
 */
export function hasValidTwoFactorTempSession() {
  return Boolean(getTwoFactorTempSession());
}

/**
 * Limpia los datos temporales del flujo 2FA.
 */
export function clearTwoFactorTempSession() {
  localStorage.removeItem(TEMP_2FA_USER_ID_KEY);
  localStorage.removeItem(TEMP_2FA_STATUS_KEY);
  localStorage.removeItem(TEMP_2FA_EXPIRES_AT_KEY);
}

/**
 * Normaliza el código 2FA.
 * Solo permite números y máximo 6 dígitos.
 */
function normalizeCode(code) {
  return String(code || "")
    .replace(/\D/g, "")
    .slice(0, 6);
}

/**
 * Normaliza el user_id temporal.
 * El backend espera string.
 */
function normalizeUserId(userId) {
  return String(userId || "").trim();
}

/**
 * POST /login
 *
 * El backend espera:
 * Content-Type: application/x-www-form-urlencoded
 *
 * username=<CURP>
 * password=<contraseña>
 *
 * Importante:
 * Este endpoint NO devuelve token.
 * Devuelve:
 * - pending_setup
 * - pending_2fa
 */
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

/**
 * GET /users/me
 *
 * Requiere token Bearer.
 * Por eso primero debemos guardar el token en localStorage
 * antes de llamar esta función.
 */
export async function getCurrentUserProfile() {
  const response = await api.get(endpoints.auth.me);
  return response.data;
}

/**
 * POST /setup
 *
 * Se usa SOLO cuando el login respondió:
 * status === "pending_setup"
 *
 * Devuelve una imagen PNG como blob.
 */
export async function fetchTwoFactorSetupQr({ userId }) {
  const response = await api.post(
    endpoints.auth.setupTwoFactor,
    {
      user_id: normalizeUserId(userId),
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

/**
 * POST /enable
 *
 * Se usa SOLO en la primera configuración 2FA.
 *
 * Devuelve:
 * {
 *   "access_token": "...",
 *   "refresh_token": "...",
 *   "token_type": "bearer"
 * }
 */
export async function enableTwoFactorRequest({ userId, code }) {
  const response = await api.post(
    endpoints.auth.enableTwoFactor,
    {
      user_id: normalizeUserId(userId),
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

/**
 * POST /login/2fa
 *
 * Se usa cuando el usuario ya tiene 2FA activo.
 *
 * Devuelve:
 * {
 *   "access_token": "...",
 *   "refresh_token": "...",
 *   "token_type": "bearer"
 * }
 */
export async function verifyTwoFactorRequest({ userId, code }) {
  const response = await api.post(
    endpoints.auth.verifyTwoFactor,
    {
      user_id: normalizeUserId(userId),
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

/**
 * POST /refresh
 *
 * Usa refresh_token rotatorio para renovar access_token.
 */
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

/**
 * POST /logout
 *
 * Invalida el refresh_token actual en backend.
 */
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