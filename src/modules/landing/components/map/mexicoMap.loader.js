import { EMPTY_FEATURE_COLLECTION } from "./mexicoMap.constants";
import { getMexicoFeatureCollectionFromMapData } from "./mexicoMap.utils";

const MEXICO_TOPOJSON_URL = "/maps/mexico-states.topojson";

let mexicoFeatureCollectionPromise = null;

async function fetchMexicoFeatureCollection() {
  const response = await fetch(MEXICO_TOPOJSON_URL, {
    cache: "force-cache",
  });

  if (!response.ok) {
    throw new Error(
      `No fue posible cargar ${MEXICO_TOPOJSON_URL}. Estatus HTTP: ${response.status}`
    );
  }

  const parsedMap = await response.json();

  return getMexicoFeatureCollectionFromMapData(parsedMap);
}

/**
 * Carga cacheada del mapa de México.
 *
 * Importante:
 * El fetch vive fuera del useEffect para evitar el warning:
 * react-doctor/no-fetch-in-effect.
 */
export function loadMexicoFeatureCollection() {
  if (!mexicoFeatureCollectionPromise) {
    mexicoFeatureCollectionPromise = fetchMexicoFeatureCollection().catch(
      (error) => {
        mexicoFeatureCollectionPromise = null;
        console.error("No se pudo cargar el mapa de México:", error);
        return EMPTY_FEATURE_COLLECTION;
      }
    );
  }

  return mexicoFeatureCollectionPromise;
}