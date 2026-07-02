import api from "../../../api/http";
import endpoints from "../../../api/endpoints";

function normalizeUserId(userId) {
  return String(userId || "").trim();
}

function normalizeCurp(value) {
  return String(value || "")
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 18);
}

function normalizeNullableNumber(value) {
  if (value === "" || value === null || value === undefined) {
    return null;
  }

  const numericValue = Number(value);
  return Number.isFinite(numericValue) ? numericValue : null;
}

export function buildUserUpdatePayload(form) {
  const payload = {
    nombre: String(form.nombre || "").trim(),
    primer_apellido: String(form.primer_apellido || "").trim(),
    segundo_apellido: String(form.segundo_apellido || "").trim(),
    correo_electronico: String(form.correo_electronico || "").trim(),
    curp: normalizeCurp(form.curp),
    entidad_federativa_id: normalizeNullableNumber(form.entidad_federativa_id),
    numero_telefono: String(form.numero_telefono || "").trim(),
  };

  const password = String(form.password || "").trim();

  if (password) {
    payload.password = password;
  }

  return payload;
}

export async function updateUserProfileRequest({ userId, payload }) {
  const cleanUserId = normalizeUserId(userId);

  if (!cleanUserId) {
    throw new Error("No se pudo determinar el usuario a actualizar.");
  }

  const response = await api.patch(endpoints.users.update(cleanUserId), payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
}