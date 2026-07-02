/**
 * Normaliza propiedades provenientes de un archivo GeoJSON/TopoJSON
 * para obtener un código estable de entidad federativa.
 *
 * Importante:
 * - No inventa estados.
 * - Si no puede identificar una entidad con seguridad, devuelve null.
 * - Soporta claves numéricas INEGI/CVE_ENT, nombres de estados y códigos MX-*.
 */

const STATE_CODE_BY_NUMERIC_KEY = {
  "01": "MX-AGU",
  "02": "MX-BCN",
  "03": "MX-BCS",
  "04": "MX-CAM",
  "05": "MX-COA",
  "06": "MX-COL",
  "07": "MX-CHP",
  "08": "MX-CHH",
  "09": "MX-CMX",
  10: "MX-DUR",
  11: "MX-GUA",
  12: "MX-GRO",
  13: "MX-HID",
  14: "MX-JAL",
  15: "MX-MEX",
  16: "MX-MIC",
  17: "MX-MOR",
  18: "MX-NAY",
  19: "MX-NLE",
  20: "MX-OAX",
  21: "MX-PUE",
  22: "MX-QUE",
  23: "MX-ROO",
  24: "MX-SLP",
  25: "MX-SIN",
  26: "MX-SON",
  27: "MX-TAB",
  28: "MX-TAM",
  29: "MX-TLA",
  30: "MX-VER",
  31: "MX-YUC",
  32: "MX-ZAC",
};

const STATE_CODE_BY_NAME = {
  aguascalientes: "MX-AGU",
  "baja california": "MX-BCN",
  "baja california sur": "MX-BCS",
  campeche: "MX-CAM",
  coahuila: "MX-COA",
  "coahuila de zaragoza": "MX-COA",
  colima: "MX-COL",
  chiapas: "MX-CHP",
  chihuahua: "MX-CHH",
  "ciudad de mexico": "MX-CMX",
  cdmx: "MX-CMX",
  "distrito federal": "MX-CMX",
  durango: "MX-DUR",
  guanajuato: "MX-GUA",
  guerrero: "MX-GRO",
  hidalgo: "MX-HID",
  jalisco: "MX-JAL",
  mexico: "MX-MEX",
  "estado de mexico": "MX-MEX",
  michoacan: "MX-MIC",
  "michoacan de ocampo": "MX-MIC",
  morelos: "MX-MOR",
  nayarit: "MX-NAY",
  "nuevo leon": "MX-NLE",
  oaxaca: "MX-OAX",
  puebla: "MX-PUE",
  queretaro: "MX-QUE",
  "queretaro de arteaga": "MX-QUE",
  "quintana roo": "MX-ROO",
  "san luis potosi": "MX-SLP",
  sinaloa: "MX-SIN",
  sonora: "MX-SON",
  tabasco: "MX-TAB",
  tamaulipas: "MX-TAM",
  tlaxcala: "MX-TLA",
  veracruz: "MX-VER",
  "veracruz de ignacio de la llave": "MX-VER",
  yucatan: "MX-YUC",
  zacatecas: "MX-ZAC",
};

const DIRECT_STATE_CODES = new Set([
  "MX-AGU",
  "MX-BCN",
  "MX-BCS",
  "MX-CAM",
  "MX-COA",
  "MX-COL",
  "MX-CHP",
  "MX-CHH",
  "MX-CMX",
  "MX-DUR",
  "MX-GUA",
  "MX-GRO",
  "MX-HID",
  "MX-JAL",
  "MX-MEX",
  "MX-MIC",
  "MX-MOR",
  "MX-NAY",
  "MX-NLE",
  "MX-OAX",
  "MX-PUE",
  "MX-QUE",
  "MX-ROO",
  "MX-SLP",
  "MX-SIN",
  "MX-SON",
  "MX-TAB",
  "MX-TAM",
  "MX-TLA",
  "MX-VER",
  "MX-YUC",
  "MX-ZAC",
]);

const PREFERRED_PROPERTY_KEYS = [
  "id",
  "ID",
  "code",
  "CODE",
  "iso",
  "ISO",
  "clave",
  "CLAVE",
  "cve_ent",
  "CVE_ENT",
  "CVEGEO",
  "ENTIDAD",
  "entidad",
  "state_code",
  "STATE_CODE",
  "state_name",
  "STATE_NAME",
  "name",
  "NAME",
  "nombre",
  "NOMBRE",
  "nom_ent",
  "NOM_ENT",
  "estado",
  "ESTADO",
  "state",
  "STATE",
];

const normalizeText = (value) =>
  String(value ?? "")
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .toLowerCase();

const normalizeNumericKey = (value) => {
  const cleanValue = String(value ?? "").trim();

  if (!/^\d{1,2}$/.test(cleanValue)) {
    return null;
  }

  return cleanValue.padStart(2, "0");
};

const hasUsableValue = (value) =>
  value !== undefined && value !== null && value !== "";

/**
 * Obtiene candidatos sin usar map().filter().
 * Primero agrega valores de llaves preferidas y luego los valores restantes.
 */
const getCandidateValues = (properties = {}) => {
  const candidates = [];
  const usedValues = new Set();

  for (const key of PREFERRED_PROPERTY_KEYS) {
    const value = properties[key];

    if (!hasUsableValue(value)) continue;

    candidates.push(value);
    usedValues.add(value);
  }

  for (const value of Object.values(properties)) {
    if (!hasUsableValue(value) || usedValues.has(value)) continue;

    candidates.push(value);
  }

  return candidates;
};

export const normalizeMexicoStateCode = (properties = {}) => {
  const candidates = getCandidateValues(properties);

  for (const value of candidates) {
    const rawValue = String(value ?? "").trim();
    const upperValue = rawValue.toUpperCase();

    if (DIRECT_STATE_CODES.has(upperValue)) {
      return upperValue;
    }

    const numericKey = normalizeNumericKey(rawValue);

    if (numericKey && STATE_CODE_BY_NUMERIC_KEY[numericKey]) {
      return STATE_CODE_BY_NUMERIC_KEY[numericKey];
    }

    const normalizedName = normalizeText(rawValue);

    if (STATE_CODE_BY_NAME[normalizedName]) {
      return STATE_CODE_BY_NAME[normalizedName];
    }
  }

  return null;
};