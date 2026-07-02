function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function pickFirstValue(...values) {
  for (const value of values) {
    if (typeof value === "string" && value.trim() !== "") {
      return value.trim();
    }

    if (value !== undefined && value !== null && value !== "") {
      return value;
    }
  }

  return null;
}

function unwrapPayload(payload) {
  if (!isPlainObject(payload)) return {};
  return isPlainObject(payload.data) ? payload.data : payload;
}

/**
 * Convierte un arreglo de errores del backend en un mensaje legible.
 * Evita usar map().filter(Boolean) para no recorrer el arreglo dos veces.
 */
function buildDetailArrayMessage(detailList) {
  const messages = [];

  for (const item of detailList) {
    const message = item?.msg || item?.message || "";

    if (message) {
      messages.push(message);
    }
  }

  return messages.join(" ");
}

/**
 * Obtiene un mensaje de error legible desde respuestas del backend,
 * errores de Axios o errores nativos de JavaScript.
 */
export function getErrorMessage(
  error,
  fallback = "Ocurrió un error al procesar la solicitud."
) {
  const responseData = error?.response?.data;

  const detail = pickFirstValue(
    responseData?.detail,
    responseData?.message,
    responseData?.error,
    error?.message
  );

  if (typeof detail === "string" && detail.trim()) {
    return detail.trim();
  }

  if (Array.isArray(responseData?.detail)) {
    const message = buildDetailArrayMessage(responseData.detail);
    return message || fallback;
  }

  if (isPlainObject(responseData?.detail)) {
    return responseData.detail.message || responseData.detail.msg || fallback;
  }

  return fallback;
}

/**
 * Resuelve el nombre visible del usuario autenticado.
 */
export function getAuthUserDisplayName(user) {
  return (
    user?.nombre ||
    user?.name ||
    user?.full_name ||
    user?.correo ||
    user?.email ||
    user?.username ||
    "Usuario"
  );
}

/**
 * Normaliza la respuesta final del backend cuando 2FA fue correcto.
 *
 * Aplica para:
 * - POST /enable
 * - POST /login/2fa
 * - POST /refresh
 */
export function normalizeFinalSession(payload) {
  const data = unwrapPayload(payload);

  const token = pickFirstValue(
    data?.access_token,
    data?.token,
    data?.accessToken
  );

  if (!token) {
    return null;
  }

  const refreshToken = pickFirstValue(
    data?.refresh_token,
    data?.refreshToken,
    data?.refresh
  );

  const tokenType =
    pickFirstValue(data?.token_type, data?.tokenType) || "bearer";

  return {
    token,
    refreshToken,
    tokenType,
  };
}

/**
 * Normaliza el perfil devuelto por GET /users/me.
 */
export function normalizeUserProfile(payload) {
  const data = unwrapPayload(payload);

  if (!isPlainObject(data)) return null;

  return data;
}