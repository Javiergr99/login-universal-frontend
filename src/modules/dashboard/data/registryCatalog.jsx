import AssignmentTurnedInRoundedIcon from "@mui/icons-material/AssignmentTurnedInRounded";
import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import HealthAndSafetyRoundedIcon from "@mui/icons-material/HealthAndSafetyRounded";

import routes from "../../../app/routes";
import { REGISTRY_ACCESS_RULES } from "../../../utils/rbac";

/**
 * Catálogo visual local.
 *
 * Importante:
 * Este catálogo NO asigna permisos.
 * Solo traduce los accesos que vengan del backend a tarjetas visuales.
 */
export const registryCatalog = {
  rncas: {
    key: "rncas",
    aliases: [
      "rncas",
      "registro nacional de centros de asistencia social",
      "centros de asistencia social",
      "cas",
    ],
    groupCode: "RNCAS",
    accessRule: REGISTRY_ACCESS_RULES.rncas,
    code: "RNCAS",
    title: "Minería de datos públicos nacional de centros de asistencia social",
    subtitle: "Registro Nacional de Centros de Asistencia Social",
    description:
      "Consulta información relacionada con centros de asistencia social, registros habilitados y datos institucionales disponibles según los permisos asignados a tu perfil.",
    route: routes.rncas || routes.dashboard,
    icon: <AssignmentTurnedInRoundedIcon />,
  },

  rmh: {
    key: "rmh",
    aliases: [
      "rmh",
      "mh",
      "movilidad humana",
      "registro de movilidad humana",
      "registro de ninas ninos y adolescentes en movilidad humana",
      "registro de niñas niños y adolescentes en movilidad humana",
    ],
    groupCode: "MH",
    accessRule: REGISTRY_ACCESS_RULES.movilidadHumana,
    code: "RMH",
    title: "Minería de datos públicos de NNA en contexto de movilidad humana",
    subtitle: "Registro de Niñas, Niños y Adolescentes en Movilidad Humana",
    description:
      "Accede a información de niñas, niños y adolescentes en contexto de movilidad humana, incluyendo datos generales, localización, vínculos familiares y condiciones de tránsito.",
    route: routes.movilidadHumana || routes.dashboard,
    icon: <PublicRoundedIcon />,
  },

  dvf: {
    key: "dvf",
    aliases: [
      "dvf",
      "vf",
      "vivir en familia",
      "derecho a vivir en familia",
      "registro del derecho a vivir en familia",
    ],
    groupCode: "VF",
    accessRule: REGISTRY_ACCESS_RULES.vivirEnFamilia,
    code: "DVF",
    title: "Minería de datos públicos del derecho a vivir en familia",
    subtitle: "Registro del Derecho a Vivir en Familia",
    description:
      "Consulta información vinculada con procedimientos de adopción, acogimiento familiar y procesos relacionados con el derecho de niñas, niños y adolescentes a vivir en familia.",
    route: routes.vivirEnFamilia || routes.dashboard,
    icon: <HomeRoundedIcon />,
  },

  rmp: {
    key: "rmp",
    aliases: [
      "rmp",
      "mp",
      "medidas",
      "medidas de proteccion",
      "medidas de protección",
      "registro de medidas de proteccion",
      "registro de medidas de protección",
    ],
    groupCode: "MP",
    accessRule: REGISTRY_ACCESS_RULES.medidasProteccion,
    code: "RMP",
    title: "Minería de datos públicos de medidas de protección",
    subtitle: "Registro de Medidas de Protección",
    description:
      "Ingresa al registro de medidas de protección para consultar, capturar o dar seguimiento a los casos asociados a tu cuenta y permisos institucionales.",
    route: routes.medidas || routes.dashboard,
    icon: <HealthAndSafetyRoundedIcon />,
  },
};
