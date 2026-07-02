import PropTypes from "prop-types";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import routes from "../routes";
import { useAuth } from "../../hooks/useAuth";
import { getPostLoginWelcomeFlag } from "../../utils/storage";
import { hasValidTwoFactorTempSession } from "../../modules/auth/services/auth.service";
import {
  captureAuthRedirectFromLocation,
  hasStoredAuthRedirectTarget,
} from "../../utils/authRedirect";

/**
 * Protege la ruta de verificación 2FA.
 *
 * Solo permite entrar si hay un reto pendiente.
 */
export default function PendingTwoFactorRoute({ children = null }) {
  const location = useLocation();
  const { isAuthenticated, isPendingTwoFactor } = useAuth();

  captureAuthRedirectFromLocation(location);

  const hasStoredTwoFactorChallenge = hasValidTwoFactorTempSession();
  const hasRedirectTarget = hasStoredAuthRedirectTarget();

  if (isAuthenticated) {
    if (getPostLoginWelcomeFlag() || hasRedirectTarget) {
      return <Navigate to={routes.postLoginWelcome} replace />;
    }

    return <Navigate to={routes.dashboard} replace />;
  }

  if (!isPendingTwoFactor && !hasStoredTwoFactorChallenge) {
    return <Navigate to={routes.login} replace />;
  }

  return children || <Outlet />;
}

PendingTwoFactorRoute.propTypes = {
  children: PropTypes.node,
};