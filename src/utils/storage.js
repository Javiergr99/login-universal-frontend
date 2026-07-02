const STORAGE_KEYS = {
  token: "token",
  refreshToken: "refresh_token",
  tokenType: "token_type",
  user: "auth_user",
  rememberedUser: "remember_user",

  /**
   * Key versionada.
   * Esto evita que una estructura vieja de sessionStorage rompa la app
   * si en el futuro cambia el contrato del reto 2FA.
   */
  pendingTwoFactor: "pending_2fa_challenge:v1",

  /**
   * Key anterior.
   * Se conserva solo para limpiar/migrar sesiones viejas.
   */
  legacyPendingTwoFactor: "pending_2fa_challenge",

  postLoginWelcome: "show_post_login_welcome",
};

const PENDING_2FA_TTL_MS = 10 * 60 * 1000;
const VALID_PENDING_2FA_STATUSES = ["pending_setup", "pending_2fa"];

function safeJsonParse(value, fallback = null) {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function getPendingTwoFactorExpirationTimestamp() {
  return Date.now() + PENDING_2FA_TTL_MS;
}

function isExpiredTimestamp(expiresAt) {
  const expirationTimestamp = Number(expiresAt);

  if (!Number.isFinite(expirationTimestamp)) {
    return true;
  }

  return Date.now() > expirationTimestamp;
}

function isValidPendingTwoFactorStatus(status) {
  return VALID_PENDING_2FA_STATUSES.includes(String(status || ""));
}

/**
 * Normaliza el reto 2FA antes de guardarlo o recuperarlo.
 *
 * Si el reto no tiene expiresAt, se le asigna uno.
 * Esto evita romper pruebas o sesiones generadas antes de agregar expiración,
 * pero ya no permite que vivan indefinidamente.
 */
function normalizePendingTwoFactorChallenge(challenge) {
  if (!challenge || typeof challenge !== "object" || Array.isArray(challenge)) {
    return null;
  }

  const tempUserId =
    challenge.tempUserId ||
    challenge.temp_user_id ||
    challenge.userId ||
    challenge.user_id ||
    challenge.id ||
    "";

  const status = challenge.status || "";

  if (!tempUserId || !isValidPendingTwoFactorStatus(status)) {
    return null;
  }

  const currentExpiresAt = Number(challenge.expiresAt);

  const expiresAt =
    Number.isFinite(currentExpiresAt) && currentExpiresAt > Date.now()
      ? currentExpiresAt
      : getPendingTwoFactorExpirationTimestamp();

  return {
    ...challenge,
    tempUserId: String(tempUserId),
    status,
    expiresAt,
  };
}

function readPendingTwoFactorChallengeFromStorage(key) {
  const storedChallenge = safeJsonParse(sessionStorage.getItem(key), null);

  if (!storedChallenge) {
    return null;
  }

  const normalizedChallenge =
    normalizePendingTwoFactorChallenge(storedChallenge);

  if (!normalizedChallenge || isExpiredTimestamp(normalizedChallenge.expiresAt)) {
    return null;
  }

  return normalizedChallenge;
}

export function getStoredAuthSession() {
  const token = localStorage.getItem(STORAGE_KEYS.token);
  const refreshToken = localStorage.getItem(STORAGE_KEYS.refreshToken);
  const tokenType = localStorage.getItem(STORAGE_KEYS.tokenType);
  const user = safeJsonParse(localStorage.getItem(STORAGE_KEYS.user), null);

  return {
    token,
    refreshToken,
    tokenType,
    user,
  };
}

export function persistAuthSession({ token, refreshToken, tokenType, user }) {
  if (token) {
    localStorage.setItem(STORAGE_KEYS.token, token);
  } else {
    localStorage.removeItem(STORAGE_KEYS.token);
  }

  if (refreshToken) {
    localStorage.setItem(STORAGE_KEYS.refreshToken, refreshToken);
  } else {
    localStorage.removeItem(STORAGE_KEYS.refreshToken);
  }

  if (tokenType) {
    localStorage.setItem(STORAGE_KEYS.tokenType, tokenType);
  } else {
    localStorage.removeItem(STORAGE_KEYS.tokenType);
  }

  if (user) {
    localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEYS.user);
  }
}

export function clearAuthSession() {
  localStorage.removeItem(STORAGE_KEYS.token);
  localStorage.removeItem(STORAGE_KEYS.refreshToken);
  localStorage.removeItem(STORAGE_KEYS.tokenType);
  localStorage.removeItem(STORAGE_KEYS.user);
}

export function getRememberedUser() {
  return localStorage.getItem(STORAGE_KEYS.rememberedUser) || "";
}

export function setRememberedUser(value) {
  const nextValue = value?.trim() || "";

  if (!nextValue) {
    localStorage.removeItem(STORAGE_KEYS.rememberedUser);
    return;
  }

  localStorage.setItem(STORAGE_KEYS.rememberedUser, nextValue);
}

export function clearRememberedUser() {
  localStorage.removeItem(STORAGE_KEYS.rememberedUser);
}

export function getPendingTwoFactorChallenge() {
  const versionedChallenge = readPendingTwoFactorChallengeFromStorage(
    STORAGE_KEYS.pendingTwoFactor
  );

  if (versionedChallenge) {
    sessionStorage.setItem(
      STORAGE_KEYS.pendingTwoFactor,
      JSON.stringify(versionedChallenge)
    );

    sessionStorage.removeItem(STORAGE_KEYS.legacyPendingTwoFactor);

    return versionedChallenge;
  }

  /**
   * Compatibilidad temporal:
   * Si existe una sesión vieja con la key anterior, se migra a v1
   * agregando expiración.
   */
  const legacyChallenge = readPendingTwoFactorChallengeFromStorage(
    STORAGE_KEYS.legacyPendingTwoFactor
  );

  if (legacyChallenge) {
    sessionStorage.setItem(
      STORAGE_KEYS.pendingTwoFactor,
      JSON.stringify(legacyChallenge)
    );

    sessionStorage.removeItem(STORAGE_KEYS.legacyPendingTwoFactor);

    return legacyChallenge;
  }

  clearPendingTwoFactorChallenge();

  return null;
}

export function persistPendingTwoFactorChallenge(challenge) {
  const normalizedChallenge = normalizePendingTwoFactorChallenge(challenge);

  if (!normalizedChallenge) {
    clearPendingTwoFactorChallenge();
    return;
  }

  sessionStorage.setItem(
    STORAGE_KEYS.pendingTwoFactor,
    JSON.stringify(normalizedChallenge)
  );

  /**
   * Limpiamos la key anterior para evitar inconsistencias.
   */
  sessionStorage.removeItem(STORAGE_KEYS.legacyPendingTwoFactor);
}

export function clearPendingTwoFactorChallenge() {
  sessionStorage.removeItem(STORAGE_KEYS.pendingTwoFactor);
  sessionStorage.removeItem(STORAGE_KEYS.legacyPendingTwoFactor);
}

export function getPostLoginWelcomeFlag() {
  return sessionStorage.getItem(STORAGE_KEYS.postLoginWelcome) === "1";
}

export function setPostLoginWelcomeFlag(enabled = true) {
  if (enabled) {
    sessionStorage.setItem(STORAGE_KEYS.postLoginWelcome, "1");
    return;
  }

  sessionStorage.removeItem(STORAGE_KEYS.postLoginWelcome);
}

export function clearPostLoginWelcomeFlag() {
  sessionStorage.removeItem(STORAGE_KEYS.postLoginWelcome);
}