import PropTypes from "prop-types";
import { Navigate, Outlet } from "react-router-dom";

import routes from "../routes";
import { useAuth } from "../../hooks/useAuth";
import { hasValidTwoFactorTempSession } from "../../modules/auth/services/auth.service";

/**
 * Protege rutas privadas.
 *
 * Si no hay sesión, redirige al login.
 * Si hay reto 2FA pendiente, redirige a verificación.
 *
 * @param {{
 *   children?: import("react").ReactNode,
 *   redirectTo?: string
 * }} props
 * @returns {JSX.Element}
 */
export default function ProtectedRoute({
  children = null,
  redirectTo = routes.login,
}) {
  const { isAuthenticated, isPendingTwoFactor } = useAuth();
  const hasStoredTwoFactorChallenge = hasValidTwoFactorTempSession();

  if (isPendingTwoFactor || hasStoredTwoFactorChallenge) {
    return <Navigate to={routes.twoFactor} replace />;
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return children || <Outlet />;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node,
  redirectTo: PropTypes.string,
};