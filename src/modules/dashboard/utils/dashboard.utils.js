import { registryCatalog } from "../data/registryCatalog";
import {
  findPermissionGroup,
  getActionNamesFromGroup,
  getModulesFromGroup,
  getPermissionGroups,
  hasRegistryAccess,
} from "../../../utils/rbac";

/**
 * Lee el usuario autenticado desde localStorage.
 */
export function getStoredDashboardUser() {
  try {
    return JSON.parse(localStorage.getItem("auth_user") || "null");
  } catch {
    return null;
  }
}

function normalizeText(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function getRegistryPermissionGroup(user, registry) {
  const directGroup = findPermissionGroup(user, registry.groupCode);

  if (directGroup) {
    return directGroup;
  }

  const groups = getPermissionGroups(user);

  const registryCandidates = [
    registry.groupCode,
    registry.code,
    registry.key,
    registry.title,
    registry.subtitle,
    ...(registry.aliases || []),
  ].map(normalizeText);

  return (
    groups.find((group) => {
      const groupCandidates = [
        group?.nombre,
        group?.name,
        group?.codigo,
        group?.code,
        group?.clave,
        group?.descripcion,
        group?.description,
      ].map(normalizeText);

      return groupCandidates.some((candidate) =>
        registryCandidates.includes(candidate)
      );
    }) || null
  );
}

function buildRegistryAccessFromGroup({ registry, group, canOpen }) {
  const modules = getModulesFromGroup(group);
  const actionNames = getActionNamesFromGroup(group);

  return {
    ...registry,
    groupId: group?.id || null,
    groupCode: group?.nombre || registry.groupCode || registry.code,
    groupDescription: group?.descripcion || registry.title,
    modulesCount: modules.length,
    actionsCount: actionNames.size,
    grantedActions: Array.from(actionNames),
    canOpen,
  };
}

export function getAllowedRegistriesFromUser(user) {
  if (!user) return [];

  const allowedRegistries = [];

  for (const registry of Object.values(registryCatalog)) {
    const group = getRegistryPermissionGroup(user, registry);

    if (!group) {
      continue;
    }

    const canOpen = hasRegistryAccess(user, registry.accessRule);

    allowedRegistries.push(
      buildRegistryAccessFromGroup({
        registry,
        group,
        canOpen,
      })
    );
  }

  return allowedRegistries;
}

export function getDashboardDisplayName(user) {
  const fullName = [
    user?.nombre,
    user?.primer_apellido,
    user?.segundo_apellido,
  ]
    .filter(Boolean)
    .join(" ")
    .trim();

  return (
    user?.nombre_completo ||
    user?.nombreCompleto ||
    fullName ||
    user?.name ||
    user?.correo_electronico ||
    user?.email ||
    "Usuario"
  );
}