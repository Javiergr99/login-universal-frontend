import PropTypes from "prop-types";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import routes from "../routes";
import { useAuth } from "../../hooks/useAuth";
import { getStoredAuthSession } from "../../utils/storage";
import { hasPermissionGroupAccess } from "../../utils/rbac";

const EMPTY_ACTIONS = [];

/**
 * Protege rutas por permisos RBAC.
 *
 * Estructura backend esperada:
 * user.permisos.grupos[].modulos[].acciones[].nombre
 */
export default function PermissionRoute({
  children = null,
  accessRule = null,
  groupCode = "",
  allowGroupOnly = false,
  requiredActions = EMPTY_ACTIONS,
  fallbackActions = EMPTY_ACTIONS,
  redirectTo = routes.dashboard,
}) {
  const location = useLocation();
  const { user: authUser, isAuthenticated } = useAuth();

  const storedSession = getStoredAuthSession();
  const user = authUser || storedSession.user;
  const hasToken = Boolean(storedSession.token);

  const resolvedGroupCode = accessRule?.groupCode || groupCode;
  const resolvedAllowGroupOnly = accessRule?.allowGroupOnly ?? allowGroupOnly;
  const resolvedRequiredActions =
    accessRule?.requiredActions || requiredActions;
  const resolvedFallbackActions =
    accessRule?.fallbackActions || fallbackActions;

  if (!isAuthenticated && !hasToken) {
    return (
      <Navigate
        to={routes.login}
        replace
        state={{
          from: location.pathname,
        }}
      />
    );
  }

  const hasAccess = hasPermissionGroupAccess({
    user,
    groupCode: resolvedGroupCode,
    allowGroupOnly: resolvedAllowGroupOnly,
    requiredActions: resolvedRequiredActions,
    fallbackActions: resolvedFallbackActions,
  });

  if (!hasAccess) {
    return (
      <Navigate
        to={redirectTo}
        replace
        state={{
          accessDenied: true,
          deniedGroupCode: resolvedGroupCode,
          from: location.pathname,
        }}
      />
    );
  }

  return children || <Outlet />;
}

PermissionRoute.propTypes = {
  children: PropTypes.node,
  accessRule: PropTypes.shape({
    groupCode: PropTypes.string.isRequired,
    allowGroupOnly: PropTypes.bool,
    requiredActions: PropTypes.arrayOf(PropTypes.string),
    fallbackActions: PropTypes.arrayOf(PropTypes.string),
  }),
  groupCode: PropTypes.string,
  allowGroupOnly: PropTypes.bool,
  requiredActions: PropTypes.arrayOf(PropTypes.string),
  fallbackActions: PropTypes.arrayOf(PropTypes.string),
  redirectTo: PropTypes.string,
};