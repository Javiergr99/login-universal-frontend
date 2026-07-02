import { Box } from "@mui/material";

import MexicoMapCanvas from "./map/MexicoMapCanvas";
import MexicoStateInfoPanel from "./map/MexicoStateInfoPanel";
import { useMexicoInteractiveMap } from "../hooks/useMexicoInteractiveMap";

export default function MexicoInteractiveMap() {
  const {
    getFeatureStateCode,
    getFeatureStateInfo,
    handleKeyDown,
    handleSelectState,
    hoveredStateCode,
    mapFeatures,
    mapLoading,
    pathGenerator,
    selectedStateCode,
    selectedStateInfo,
    setHoveredStateCode,
  } = useMexicoInteractiveMap();

  return (
    <Box
      sx={{
        mt: { xs: 0, md: 0.2 },
        width: "100%",
        minHeight: {
          xs: 420,
          sm: 500,
          md: 520,
          lg: 560,
          xl: 600,
        },
        borderRadius: { xs: "16px", md: "20px" },
        background:
          "linear-gradient(135deg, #f7f3ef 0%, #eeeeee 48%, #e7e2dd 100%)",
        border: "1px solid #dfdfdf",
        boxShadow: "0 18px 45px rgba(0,0,0,0.06)",
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.4fr) 340px" },
        gap: { xs: 2.5, md: 3 },
        alignItems: "stretch",
        px: { xs: 1.5, sm: 2.5, md: 3 },
        py: { xs: 2, sm: 2.5, md: 3 },
        boxSizing: "border-box",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <MexicoMapCanvas
        getFeatureStateCode={getFeatureStateCode}
        getFeatureStateInfo={getFeatureStateInfo}
        hoveredStateCode={hoveredStateCode}
        mapFeatures={mapFeatures}
        mapLoading={mapLoading}
        onClearHover={() => setHoveredStateCode(null)}
        onKeyDown={handleKeyDown}
        onSelectState={handleSelectState}
        onSetHover={setHoveredStateCode}
        pathGenerator={pathGenerator}
        selectedStateCode={selectedStateCode}
      />

      <MexicoStateInfoPanel selectedStateInfo={selectedStateInfo} />
    </Box>
  );
}