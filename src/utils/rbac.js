export const RBAC_GROUPS = {
  MEDIDAS_PROTECCION: "MP",
  MOVILIDAD_HUMANA: "MH",
  RNCAS: "RNCAS",
  VIVIR_EN_FAMILIA: "VF",
};

export const MP_ACTIONS = {
  VER_DASHBOARD: "MP_VER_DASHBOARD",
  LEER_REGISTRO: "MP_LEER_REGISTRO",
  CREAR_REGISTRO: "MP_CREAR_REGISTRO",
  ENVIAR_REVISION: "MP_ENVIAR_REVISION",
  APROBAR_REGISTRO: "MP_APROBAR_REGISTRO",
  DEVOLVER_REGISTRO: "MP_DEVOLVER_REGISTRO",
  EDITAR_DATOS_GENERALES: "MP_EDITAR_DATOS_GENERALES",
  EDITAR_IMPRESION_DIAGNOSTICA: "MP_EDITAR_IMPRESION_DIAGNOSTICA",
  EDITAR_INTERVENCION: "MP_EDITAR_INTERVENCION",
  EDITAR_PLAN_RESTITUCION: "MP_EDITAR_PLAN_RESTITUCION",
  EDITAR_MEDIDAS_PROTECCION: "MP_EDITAR_MEDIDAS_PROTECCION",
  EDITAR_CIERRE_CASO: "MP_EDITAR_CIERRE_CASO",
};

export const GLOBAL_ACTIONS = {
  VER_REGISTROS_GLOBAL: "VER_REGISTROS_GLOBAL",
};

export const REGISTRY_ACCESS_RULES = {
  medidasProteccion: {
    groupCode: RBAC_GROUPS.MEDIDAS_PROTECCION,
    allowGroupOnly: false,

    /**
     * Contrato backend MP:
     * La tarjeta/módulo debe derivarse de si el usuario tiene al menos
     * una acción del grupo MP. Tener solo el grupo MP ya no basta.
     */
    requiredActions: Object.values(MP_ACTIONS),
    fallbackActions: [],
  },

  movilidadHumana: {
    groupCode: RBAC_GROUPS.MOVILIDAD_HUMANA,
    allowGroupOnly: true,
    requiredActions: [],
    fallbackActions: [],
  },

  rncas: {
    groupCode: RBAC_GROUPS.RNCAS,
    allowGroupOnly: true,
    requiredActions: [],
    fallbackActions: [],
  },

  vivirEnFamilia: {
    groupCode: RBAC_GROUPS.VIVIR_EN_FAMILIA,
    allowGroupOnly: true,
    requiredActions: [],
    fallbackActions: [],
  },
};

export const REGISTRY_ROUTE_ACCESS_RULES = {
  medidasProteccionList: {
    groupCode: RBAC_GROUPS.MEDIDAS_PROTECCION,
    allowGroupOnly: false,
    requiredActions: [MP_ACTIONS.LEER_REGISTRO],
    fallbackActions: [],
  },
};

function normalizeText(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function normalizeActionName(value) {
  return String(value || "").trim().toUpperCase();
}

export function getPermissionGroups(user) {
  return Array.isArray(user?.permisos?.grupos) ? user.permisos.grupos : [];
}

export function getModulesFromGroup(group) {
  return Array.isArray(group?.modulos) ? group.modulos : [];
}

export function getActionsFromModule(module) {
  return Array.isArray(module?.acciones) ? module.acciones : [];
}

export function getActionNamesFromGroup(group) {
  const actionNames = new Set();

  for (const moduleItem of getModulesFromGroup(group)) {
    for (const action of getActionsFromModule(moduleItem)) {
      const actionName = normalizeActionName(action?.nombre || action?.name);

      if (actionName) {
        actionNames.add(actionName);
      }
    }
  }

  return actionNames;
}

export function getUserActionNames(user) {
  const actionNames = new Set();

  for (const group of getPermissionGroups(user)) {
    for (const actionName of getActionNamesFromGroup(group)) {
      actionNames.add(actionName);
    }
  }

  return actionNames;
}

export function hasUserAction(user, actionName) {
  if (!actionName) return false;

  const userActions = getUserActionNames(user);
  return userActions.has(normalizeActionName(actionName));
}

export function hasAnyUserAction(user, actionList = []) {
  if (!Array.isArray(actionList) || actionList.length === 0) {
    return false;
  }

  return actionList.some((actionName) => hasUserAction(user, actionName));
}

export function findPermissionGroup(user, groupCode) {
  const normalizedGroupCode = normalizeText(groupCode);

  if (!normalizedGroupCode) {
    return null;
  }

  return (
    getPermissionGroups(user).find((group) => {
      const candidates = [
        group?.nombre,
        group?.name,
        group?.codigo,
        group?.code,
        group?.clave,
      ].map(normalizeText);

      return candidates.includes(normalizedGroupCode);
    }) || null
  );
}

export function groupHasAnyAction(group, actionList = []) {
  if (!group || !Array.isArray(actionList) || actionList.length === 0) {
    return false;
  }

  const groupActions = getActionNamesFromGroup(group);

  return actionList.some((actionName) =>
    groupActions.has(normalizeActionName(actionName))
  );
}

export function hasPermissionGroupAccess({
  user,
  groupCode,
  allowGroupOnly = false,
  requiredActions = [],
  fallbackActions = [],
}) {
  const group = findPermissionGroup(user, groupCode);

  if (!group) {
    return false;
  }

  if (allowGroupOnly) {
    return true;
  }

  if (!requiredActions.length && !fallbackActions.length) {
    return true;
  }

  return (
    groupHasAnyAction(group, requiredActions) ||
    groupHasAnyAction(group, fallbackActions)
  );
}

export function hasRegistryAccess(user, accessRule) {
  if (!accessRule?.groupCode) {
    return false;
  }

  return hasPermissionGroupAccess({
    user,
    groupCode: accessRule.groupCode,
    allowGroupOnly: Boolean(accessRule.allowGroupOnly),
    requiredActions: accessRule.requiredActions || [],
    fallbackActions: accessRule.fallbackActions || [],
  });
}

export function canAccessMedidasProteccion(user) {
  return hasRegistryAccess(user, REGISTRY_ACCESS_RULES.medidasProteccion);
}

export function canAccessMovilidadHumana(user) {
  return hasRegistryAccess(user, REGISTRY_ACCESS_RULES.movilidadHumana);
}

export function canAccessRncas(user) {
  return hasRegistryAccess(user, REGISTRY_ACCESS_RULES.rncas);
}

export function canAccessVivirEnFamilia(user) {
  return hasRegistryAccess(user, REGISTRY_ACCESS_RULES.vivirEnFamilia);
}