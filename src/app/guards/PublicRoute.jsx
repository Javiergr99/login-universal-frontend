import { useEffect } from "react";
import PropTypes from "prop-types";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

import routes from "../routes";
import { useAuth } from "../../hooks/useAuth";
import { getPostLoginWelcomeFlag } from "../../utils/storage";
import { hasValidTwoFactorTempSession } from "../../modules/auth/services/auth.service";
import {
  captureAuthRedirectFromLocation,
  clearStoredAuthRedirectTarget,
  hasStoredAuthRedirectTarget,
} from "../../utils/authRedirect";

/**
 * Protege rutas públicas como login.
 *
 * Si ya hay sesión, redirige al dashboard o a bienvenida.
 * Si existe reto 2FA pendiente, redirige a verificación.
 */
export default function PublicRoute({
  children = null,
  redirectTo = routes.dashboard,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    isAuthenticated,
    isPendingTwoFactor,
    clearLocalSession,
  } = useAuth();

  const searchParams = new URLSearchParams(location.search || "");
  const shouldForceLogout = searchParams.get("logout") === "1";

  useEffect(() => {
    if (!shouldForceLogout) {
      return;
    }

    clearStoredAuthRedirectTarget();
    clearLocalSession();

    navigate(routes.login, {
      replace: true,
    });
  }, [clearLocalSession, navigate, shouldForceLogout]);

  if (shouldForceLogout) {
    return null;
  }

  const capturedRedirectTarget = captureAuthRedirectFromLocation(location);
  const shouldShowPostLoginWelcome = getPostLoginWelcomeFlag();
  const hasStoredRedirectTarget =
    Boolean(capturedRedirectTarget) || hasStoredAuthRedirectTarget();

  const hasStoredTwoFactorChallenge = hasValidTwoFactorTempSession();

  const shouldGoToTwoFactor =
    isPendingTwoFactor || hasStoredTwoFactorChallenge;

  if (shouldGoToTwoFactor && location.pathname !== routes.twoFactor) {
    return <Navigate to={routes.twoFactor} replace />;
  }

  if (isAuthenticated) {
    if (
      (shouldShowPostLoginWelcome || hasStoredRedirectTarget) &&
      location.pathname !== routes.postLoginWelcome
    ) {
      return <Navigate to={routes.postLoginWelcome} replace />;
    }

    return <Navigate to={redirectTo} replace />;
  }

  return children || <Outlet />;
}

PublicRoute.propTypes = {
  children: PropTypes.node,
  redirectTo: PropTypes.string,
};