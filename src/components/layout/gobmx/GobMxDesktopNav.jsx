import PropTypes from "prop-types";
import { Box, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { desktopButtonStyles } from "./gobMxHeader.constants";

export default function GobMxDesktopNav({ onGoToLanding }) {
  return (
    <Box
      sx={{
        display: { xs: "none", md: "flex" },
        alignItems: "center",
        gap: { md: 4, lg: 5 },
      }}
    >
      <Box component="button" type="button" sx={desktopButtonStyles}>
        Trámites
      </Box>

      <Box component="button" type="button" sx={desktopButtonStyles}>
        Gobierno
      </Box>

      <Box
        component="button"
        type="button"
        onClick={onGoToLanding}
        sx={desktopButtonStyles}
      >
        Por Tus Derechos
      </Box>

      <IconButton
        aria-label="Buscar"
        sx={{
          color: "#ffffff",
          border: "1px solid rgba(255,255,255,0.30)",
          borderRadius: 1.8,
          p: "7px",
          transition: "all 200ms ease",
          "&:hover": {
            backgroundColor: "rgba(255,255,255,0.08)",
            transform: "translateY(-1px)",
          },
        }}
      >
        <SearchIcon />
      </IconButton>
    </Box>
  );
}

GobMxDesktopNav.propTypes = {
  onGoToLanding: PropTypes.func.isRequired,
};