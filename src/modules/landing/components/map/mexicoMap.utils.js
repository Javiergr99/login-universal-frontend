import { feature } from "topojson-client";

import {
  EMPTY_FEATURE_COLLECTION,
  MAP_COLORS,
} from "./mexicoMap.constants";

export function getMexicoFeatureCollectionFromMapData(parsedMap) {
  try {
    if (parsedMap?.type === "FeatureCollection") {
      return parsedMap;
    }

    if (parsedMap?.type === "Feature") {
      return {
        type: "FeatureCollection",
        features: [parsedMap],
      };
    }

    if (parsedMap?.type === "Topology") {
      const statesObject = parsedMap.objects?.states;

      if (!statesObject) {
        console.warn(
          "El TopoJSON no contiene objects.states. Revisa mexico-states.topojson."
        );

        return EMPTY_FEATURE_COLLECTION;
      }

      const convertedFeatureCollection = feature(parsedMap, statesObject);

      if (convertedFeatureCollection?.type === "FeatureCollection") {
        return convertedFeatureCollection;
      }

      if (convertedFeatureCollection?.type === "Feature") {
        return {
          type: "FeatureCollection",
          features: [convertedFeatureCollection],
        };
      }
    }

    return EMPTY_FEATURE_COLLECTION;
  } catch (error) {
    console.error("No se pudo procesar el mapa de México:", error);
    return EMPTY_FEATURE_COLLECTION;
  }
}

export function getStateFill({
  stateCode,
  selectedStateCode,
  hoveredStateCode,
}) {
  if (!stateCode) {
    return MAP_COLORS.disabledFill;
  }

  if (selectedStateCode === stateCode) {
    return MAP_COLORS.selectedFill;
  }

  if (hoveredStateCode === stateCode) {
    return MAP_COLORS.hoverFill;
  }

  return MAP_COLORS.defaultFill;
}