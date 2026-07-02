import AssignmentTurnedInRoundedIcon from "@mui/icons-material/AssignmentTurnedInRounded";
import SyncRoundedIcon from "@mui/icons-material/SyncRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
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
    title: "Registro Nacional de Centros de Asistencia Social",
    subtitle: "Centros de asistencia social",
    description:
      "Consulta y da seguimiento a la información relacionada con centros de asistencia social y los registros habilitados para tu perfil.",
    route: routes.rncas || routes.dashboard,
    icon: <AssignmentTurnedInRoundedIcon sx={{ fontSize: 34 }} />,
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
    title: "Registro de Niñas, Niños y Adolescentes en Movilidad Humana",
    subtitle: "Movilidad humana",
    description:
      "Accede al módulo de movilidad humana para consultar información, validar datos y continuar con los flujos habilitados.",
    route: routes.movilidadHumana || routes.dashboard,
    icon: <SyncRoundedIcon sx={{ fontSize: 34 }} />,
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
    title: "Registro del Derecho a Vivir en Familia",
    subtitle: "Derecho a vivir en familia",
    description:
      "Ingresa al registro vinculado con el derecho a vivir en familia y consulta la información disponible según tus privilegios.",
    route: routes.vivirEnFamilia || routes.dashboard,
    icon: <FavoriteBorderRoundedIcon sx={{ fontSize: 34 }} />,
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
    title: "Registro de Medidas de Protección",
    subtitle: "Medidas de protección",
    description:
      "Accede al registro de medidas de protección para consultar, capturar o dar seguimiento a los casos asociados a tu cuenta.",
    route: routes.medidas || routes.dashboard,
    icon: <HealthAndSafetyRoundedIcon sx={{ fontSize: 34 }} />,
  },
};