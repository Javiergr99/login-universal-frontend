import { useAuthContext } from "../context/AuthContext";

/**
 * Hook de acceso al contexto de autenticación.
 *
 * @returns {{
 *   user: object|null,
 *   token: string|null,
 *   tokenType: string|null,
 *   pendingTwoFactor: object|null,
 *   isAuthenticated: boolean,
 *   isPendingTwoFactor: boolean,
 *   login: Function,
 *   completeLogin: Function,
 *   startTwoFactorChallenge: Function,
 *   updatePendingTwoFactorChallenge: Function,
 *   clearTwoFactorChallenge: Function,
 *   logout: Function
 * }}
 */
export function useAuth() {
  return useAuthContext();
}