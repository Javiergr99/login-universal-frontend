import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";

import MexicoStateEmptyPanel from "./MexicoStateEmptyPanel";
import MexicoStateInfoContent from "./MexicoStateInfoContent";

export default function MexicoStateInfoPanel({ selectedStateInfo }) {
  return (
    <Box
      sx={{
        minHeight: { xs: "auto", md: "100%" },
        borderRadius: { xs: "14px", md: "18px" },
        backgroundColor: "rgba(255,255,255,0.86)",
        border: "1px solid rgba(255,255,255,0.82)",
        boxShadow: {
          xs: "0 10px 25px rgba(0,0,0,0.06)",
          md: "0 18px 36px rgba(0,0,0,0.08)",
        },
        backdropFilter: "blur(12px)",
        px: { xs: 2, sm: 2.4, md: 2.6 },
        py: { xs: 2, sm: 2.4, md: 2.8 },
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxSizing: "border-box",
      }}
    >
      {selectedStateInfo ? (
        <MexicoStateInfoContent selectedStateInfo={selectedStateInfo} />
      ) : (
        <MexicoStateEmptyPanel />
      )}

      <Box
        sx={{
          mt: { xs: 2.2, md: 3 },
          pt: 1.8,
          borderTop: "1px solid rgba(0,0,0,0.08)",
        }}
      >
        <Typography
          sx={{
            fontFamily: '"Noto Sans", sans-serif',
            fontSize: "0.76rem",
            lineHeight: 1.45,
            color: "#8a8a8a",
            fontWeight: 500,
          }}
        >
          La información mostrada corresponde a datos en proceso de integración
          y validación institucional.
        </Typography>
      </Box>
    </Box>
  );
}

MexicoStateInfoPanel.propTypes = {
  selectedStateInfo: PropTypes.shape({
    activeOffices: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    code: PropTypes.string,
    description: PropTypes.string,
    isActive: PropTypes.bool,
    lastUpdate: PropTypes.string,
    name: PropTypes.string,
  }),
};