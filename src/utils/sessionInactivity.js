export const SESSION_INACTIVITY_REASON = "session_inactivity";
export const SESSION_INACTIVITY_MESSAGE =
  "Tu sesión se cerró por inactividad.";

export const SESSION_ACTIVITY_STORAGE_KEY = "auth:last_activity_at:v1";
export const SESSION_LOGOUT_EVENT_STORAGE_KEY = "auth:logout_event:v1";

const DEFAULT_INACTIVITY_TIMEOUT_MINUTES = 60;
const ACTIVITY_WRITE_THROTTLE_MS = 1000;

let lastActivityWriteAt = 0;

function getConfiguredTimeoutMinutes() {
  const rawValue = import.meta.env.VITE_SESSION_INACTIVITY_TIMEOUT_MINUTES;

  const parsedValue = Number(rawValue);

  if (Number.isFinite(parsedValue) && parsedValue > 0) {
    return parsedValue;
  }

  return DEFAULT_INACTIVITY_TIMEOUT_MINUTES;
}

function createEventId() {
  if (window.crypto?.randomUUID) {
    return window.crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function getSessionInactivityTimeoutMs() {
  return getConfiguredTimeoutMinutes() * 60 * 1000;
}

export function markSessionActivity({ force = false } = {}) {
  const now = Date.now();

  if (!force && now - lastActivityWriteAt < ACTIVITY_WRITE_THROTTLE_MS) {
    return;
  }

  lastActivityWriteAt = now;

  try {
    localStorage.setItem(SESSION_ACTIVITY_STORAGE_KEY, String(now));
  } catch (error) {
    console.warn("No fue posible registrar actividad de sesión:", error);
  }
}

export function getLastSessionActivityAt() {
  const storedValue = localStorage.getItem(SESSION_ACTIVITY_STORAGE_KEY);
  const timestamp = Number(storedValue);

  if (!Number.isFinite(timestamp) || timestamp <= 0) {
    return 0;
  }

  return timestamp;
}

export function getRemainingInactivityMs() {
  const lastActivityAt = getLastSessionActivityAt();
  const timeoutMs = getSessionInactivityTimeoutMs();

  if (!lastActivityAt) {
    return timeoutMs;
  }

  return Math.max(timeoutMs - (Date.now() - lastActivityAt), 0);
}

export function broadcastSessionInactivityLogout() {
  const eventPayload = {
    type: SESSION_INACTIVITY_REASON,
    at: Date.now(),
    id: createEventId(),
  };

  try {
    localStorage.setItem(
      SESSION_LOGOUT_EVENT_STORAGE_KEY,
      JSON.stringify(eventPayload)
    );
  } catch (error) {
    console.warn("No fue posible sincronizar cierre por inactividad:", error);
  }
}

export function parseSessionLogoutEvent(value) {
  try {
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
}

export function isSessionInactivityLogoutEvent(value) {
  const eventPayload = parseSessionLogoutEvent(value);

  return eventPayload?.type === SESSION_INACTIVITY_REASON;
}
