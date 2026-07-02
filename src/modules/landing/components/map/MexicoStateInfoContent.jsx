import PropTypes from "prop-types";
import { Box, Chip, Divider, Stack, Typography } from "@mui/material";

import MexicoStateInfoMetric from "./MexicoStateInfoMetric";

export default function MexicoStateInfoContent({ selectedStateInfo }) {
  return (
    <Box>
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 1.4 }}
      >
        <Chip
          label={selectedStateInfo.isActive ? "Activo" : "Inactivo"}
          size="small"
          variant="outlined"
          sx={{
            height: 34,
            borderRadius: "999px",
            backgroundColor: "#ffffff",
            border: selectedStateInfo.isActive
              ? "2px solid rgba(112,112,112,0.35)"
              : "2px solid rgba(138,15,61,0.28)",
            color: selectedStateInfo.isActive ? "#6d6d6d" : "#8a0f3d",
            fontFamily: '"Noto Sans", sans-serif',
            fontSize: "0.9rem",
            fontWeight: 700,
            "& .MuiChip-label": {
              px: 1.1,
            },
          }}
        />

        <Typography
          sx={{
            fontFamily: '"Noto Sans", sans-serif',
            fontSize: "0.72rem",
            fontWeight: 800,
            color: "#9a9a9a",
            letterSpacing: "0.04em",
          }}
        >
          {selectedStateInfo.code}
        </Typography>
      </Stack>

      <Typography
        sx={{
          fontFamily: '"Patria", serif',
          fontSize: { xs: "2.05rem", md: "2.45rem" },
          lineHeight: 0.98,
          fontWeight: 700,
          color: "#a51d49",
          mb: 1.1,
          letterSpacing: "-0.015em",
        }}
      >
        {selectedStateInfo.name}
      </Typography>

      <Typography
        sx={{
          fontFamily: '"Noto Sans", sans-serif',
          fontSize: { xs: "0.9rem", md: "0.92rem" },
          lineHeight: 1.58,
          fontWeight: 400,
          color: "#666666",
          mb: 2.2,
        }}
      >
        {selectedStateInfo.description}
      </Typography>

      <Divider sx={{ borderColor: "rgba(138,15,61,0.12)", mb: 2 }} />

      <Stack spacing={1.6}>
        <MexicoStateInfoMetric
          label="Procuradurías activas"
          value={selectedStateInfo.activeOffices}
        />

        <MexicoStateInfoMetric
          label="Última actualización"
          value={selectedStateInfo.lastUpdate}
        />
      </Stack>
    </Box>
  );
}

MexicoStateInfoContent.propTypes = {
  selectedStateInfo: PropTypes.shape({
    activeOffices: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    code: PropTypes.string,
    description: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
    lastUpdate: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};