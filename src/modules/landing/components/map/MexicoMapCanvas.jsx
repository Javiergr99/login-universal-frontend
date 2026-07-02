import PropTypes from "prop-types";
import { Box } from "@mui/material";

import {
  MAP_FOCUS_VISIBLE_STYLES,
  MAP_HEIGHT,
  MAP_WIDTH,
} from "./mexicoMap.constants";
import MexicoMapInstructionBadge from "./MexicoMapInstructionBadge";
import MexicoMapUnavailable from "./MexicoMapUnavailable";
import MexicoStatePath from "./MexicoStatePath";

export default function MexicoMapCanvas({
  getFeatureStateCode,
  getFeatureStateInfo,
  hoveredStateCode,
  mapFeatures,
  mapLoading,
  onClearHover,
  onKeyDown,
  onSelectState,
  onSetHover,
  pathGenerator,
  selectedStateCode,
}) {
  const hasMap = Boolean(pathGenerator) && mapFeatures.length > 0;

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        minHeight: { xs: 300, sm: 365, md: 460 },
        borderRadius: { xs: "14px", md: "18px" },
        background:
          "radial-gradient(circle at 50% 42%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.72) 46%, rgba(255,255,255,0.38) 100%)",
        border: "1px solid rgba(255,255,255,0.72)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        px: { xs: 0.5, sm: 1.5, md: 2 },
        py: { xs: 1.5, md: 2 },
      }}
    >
      <MexicoMapInstructionBadge />

      {hasMap ? (
        <Box
          component="svg"
          viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
          role="img"
          aria-label="Mapa interactivo de México"
          sx={{
            width: "100%",
            maxWidth: 880,
            height: "auto",
            display: "block",
            overflow: "visible",
          }}
        >
          <style>{MAP_FOCUS_VISIBLE_STYLES}</style>

          <g>
            {mapFeatures.map((geo, index) => {
              const stateCode = getFeatureStateCode(geo);
              const stateInfo = getFeatureStateInfo(stateCode);

              return (
                <MexicoStatePath
                  key={geo.id ?? stateCode ?? `state-${index}`}
                  geo={geo}
                  hoveredStateCode={hoveredStateCode}
                  index={index}
                  onClearHover={onClearHover}
                  onKeyDown={onKeyDown}
                  onSelectState={onSelectState}
                  onSetHover={onSetHover}
                  pathGenerator={pathGenerator}
                  selectedStateCode={selectedStateCode}
                  stateCode={stateCode}
                  stateInfo={stateInfo}
                />
              );
            })}
          </g>
        </Box>
      ) : (
        <MexicoMapUnavailable loading={mapLoading} />
      )}
    </Box>
  );
}

MexicoMapCanvas.propTypes = {
  getFeatureStateCode: PropTypes.func.isRequired,
  getFeatureStateInfo: PropTypes.func.isRequired,
  hoveredStateCode: PropTypes.string,
  mapFeatures: PropTypes.arrayOf(PropTypes.object).isRequired,
  mapLoading: PropTypes.bool.isRequired,
  onClearHover: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  onSelectState: PropTypes.func.isRequired,
  onSetHover: PropTypes.func.isRequired,
  pathGenerator: PropTypes.func,
  selectedStateCode: PropTypes.string,
};