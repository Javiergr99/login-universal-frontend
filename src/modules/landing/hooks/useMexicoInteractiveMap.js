import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { geoMercator, geoPath } from "d3-geo";

import {
  DEFAULT_MEXICO_STATE_INFO,
  mexicoStatesData,
} from "../data/mexicoStatesData";
import { normalizeMexicoStateCode } from "../helpers/normalizeMexicoStateCode";
import {
  EMPTY_FEATURE_COLLECTION,
  MAP_HEIGHT,
  MAP_WIDTH,
} from "../components/map/mexicoMap.constants";
import { loadMexicoFeatureCollection } from "../components/map/mexicoMap.loader";

const MAP_LOAD_ACTIONS = {
  STARTED: "STARTED",
  SUCCEEDED: "SUCCEEDED",
  FAILED: "FAILED",
};

const initialMapLoadState = {
  mexicoFeatureCollection: EMPTY_FEATURE_COLLECTION,
  loading: true,
  error: null,
};

function mapLoadReducer(state, action) {
  switch (action.type) {
    case MAP_LOAD_ACTIONS.STARTED:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case MAP_LOAD_ACTIONS.SUCCEEDED:
      return {
        mexicoFeatureCollection: action.payload || EMPTY_FEATURE_COLLECTION,
        loading: false,
        error: null,
      };

    case MAP_LOAD_ACTIONS.FAILED:
      return {
        mexicoFeatureCollection: EMPTY_FEATURE_COLLECTION,
        loading: false,
        error: action.payload || null,
      };

    default:
      return state;
  }
}

export function useMexicoInteractiveMap() {
  const [hoveredStateCode, setHoveredStateCode] = useState(null);
  const [selectedStateCode, setSelectedStateCode] = useState(null);

  const [mapLoadState, dispatchMapLoad] = useReducer(
    mapLoadReducer,
    initialMapLoadState
  );

  const { mexicoFeatureCollection, loading: mapLoading, error: mapError } =
    mapLoadState;

  useEffect(() => {
    let isMounted = true;

    dispatchMapLoad({
      type: MAP_LOAD_ACTIONS.STARTED,
    });

    loadMexicoFeatureCollection()
      .then((featureCollection) => {
        if (!isMounted) return;

        dispatchMapLoad({
          type: MAP_LOAD_ACTIONS.SUCCEEDED,
          payload: featureCollection,
        });
      })
      .catch((error) => {
        if (!isMounted) return;

        dispatchMapLoad({
          type: MAP_LOAD_ACTIONS.FAILED,
          payload: error,
        });
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const mapFeatures = useMemo(() => {
    return mexicoFeatureCollection.features ?? [];
  }, [mexicoFeatureCollection]);

  const projection = useMemo(() => {
    if (!mapFeatures.length) {
      return null;
    }

    return geoMercator().fitSize(
      [MAP_WIDTH, MAP_HEIGHT],
      mexicoFeatureCollection
    );
  }, [mapFeatures.length, mexicoFeatureCollection]);

  const pathGenerator = useMemo(() => {
    if (!projection) {
      return null;
    }

    return geoPath(projection);
  }, [projection]);

  const selectedStateInfo = useMemo(() => {
    if (!selectedStateCode) {
      return null;
    }

    return (
      mexicoStatesData[selectedStateCode] ?? {
        ...DEFAULT_MEXICO_STATE_INFO,
        code: selectedStateCode,
      }
    );
  }, [selectedStateCode]);

  const getFeatureStateCode = useCallback((geo) => {
    return normalizeMexicoStateCode(geo?.properties);
  }, []);

  const getFeatureStateInfo = useCallback((stateCode) => {
    if (stateCode && mexicoStatesData[stateCode]) {
      return mexicoStatesData[stateCode];
    }

    return DEFAULT_MEXICO_STATE_INFO;
  }, []);

  const handleSelectState = useCallback((stateCode) => {
    if (!stateCode) {
      return;
    }

    setSelectedStateCode(stateCode);
  }, []);

  const handleKeyDown = useCallback(
    (event, stateCode) => {
      if (!stateCode) {
        return;
      }

      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        handleSelectState(stateCode);
      }
    },
    [handleSelectState]
  );

  return {
    getFeatureStateCode,
    getFeatureStateInfo,
    handleKeyDown,
    handleSelectState,
    hoveredStateCode,
    mapError,
    mapFeatures,
    mapLoading,
    pathGenerator,
    selectedStateCode,
    selectedStateInfo,
    setHoveredStateCode,
  };
}