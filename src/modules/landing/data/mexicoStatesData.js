/**
 * Información institucional por entidad federativa.
 *
 * Este archivo funciona como fuente temporal/controlada para la landing.
 * Cuando exista un endpoint real, estos datos pueden venir desde backend.
 */

const mexicoStateCatalog = [
  { code: "MX-AGU", name: "Aguascalientes" },
  { code: "MX-BCN", name: "Baja California" },
  { code: "MX-BCS", name: "Baja California Sur" },
  { code: "MX-CAM", name: "Campeche" },
  { code: "MX-COA", name: "Coahuila" },
  { code: "MX-COL", name: "Colima" },
  { code: "MX-CHP", name: "Chiapas" },
  { code: "MX-CHH", name: "Chihuahua" },
  { code: "MX-CMX", name: "Ciudad de México" },
  { code: "MX-DUR", name: "Durango" },
  { code: "MX-GUA", name: "Guanajuato" },
  { code: "MX-GRO", name: "Guerrero" },
  { code: "MX-HID", name: "Hidalgo" },
  { code: "MX-JAL", name: "Jalisco" },
  { code: "MX-MEX", name: "Estado de México" },
  { code: "MX-MIC", name: "Michoacán" },
  { code: "MX-MOR", name: "Morelos" },
  { code: "MX-NAY", name: "Nayarit" },
  { code: "MX-NLE", name: "Nuevo León" },
  { code: "MX-OAX", name: "Oaxaca" },
  { code: "MX-PUE", name: "Puebla" },
  { code: "MX-QUE", name: "Querétaro" },
  { code: "MX-ROO", name: "Quintana Roo" },
  { code: "MX-SLP", name: "San Luis Potosí" },
  { code: "MX-SIN", name: "Sinaloa" },
  { code: "MX-SON", name: "Sonora" },
  { code: "MX-TAB", name: "Tabasco" },
  { code: "MX-TAM", name: "Tamaulipas" },
  { code: "MX-TLA", name: "Tlaxcala" },
  { code: "MX-VER", name: "Veracruz" },
  { code: "MX-YUC", name: "Yucatán" },
  { code: "MX-ZAC", name: "Zacatecas" },
];

export const DEFAULT_MEXICO_STATE_INFO = {
  code: null,
  name: "Entidad no identificada",
  status: "Inactivo",
  isActive: false,
  activeOffices: "Por confirmar",
  lastUpdate: "Pendiente de actualización",
  description:
    "La información de esta entidad federativa se encuentra en proceso de integración.",
};

const baseMexicoStatesData = mexicoStateCatalog.reduce((acc, state) => {
  acc[state.code] = {
    ...state,
    status: "Activo",
    isActive: true,
    activeOffices: "Por confirmar",
    lastUpdate: "Pendiente de actualización",
    description:
      "La información institucional de esta entidad federativa se encuentra en proceso de integración.",
  };

  return acc;
}, {});

export const mexicoStatesData = {
  ...baseMexicoStatesData,

  // Ejemplo visual para Puebla
  "MX-PUE": {
    ...baseMexicoStatesData["MX-PUE"],
    status: "Activo",
    isActive: true,
    activeOffices: 12,
    lastUpdate: "Agosto 2025",
  },
};