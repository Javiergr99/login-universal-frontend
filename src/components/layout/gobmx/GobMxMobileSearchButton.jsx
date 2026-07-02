import PropTypes from "prop-types";
import { Box, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { MOBILE_ITEM_HEIGHT } from "./gobMxHeader.constants";

export default function GobMxMobileSearchButton({ onClose }) {
  return (
    <Box
      sx={{
        minHeight: `${MOBILE_ITEM_HEIGHT}px`,
        height: `${MOBILE_ITEM_HEIGHT}px`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        transition: "background-color 200ms ease",
        width: "100%",
        "&:hover": {
          backgroundColor: "rgba(255,255,255,0.02)",
        },
      }}
    >
      <IconButton
        aria-label="Buscar"
        onClick={onClose}
        sx={{
          color: "#ffffff",
          border: "1px solid rgba(255,255,255,0.25)",
          borderRadius: "50%",
          width: 38,
          height: 38,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: "15px",
          transition: "all 200ms ease",
          "&:hover": {
            backgroundColor: "rgba(255,255,255,0.08)",
            transform: "scale(1.05)",
          },
        }}
      >
        <SearchIcon
          sx={{
            fontSize: { xs: 16, md: 20 },
          }}
        />
      </IconButton>
    </Box>
  );
}

GobMxMobileSearchButton.propTypes = {
  onClose: PropTypes.func.isRequired,
};