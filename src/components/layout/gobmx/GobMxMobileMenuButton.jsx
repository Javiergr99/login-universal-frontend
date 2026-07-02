import PropTypes from "prop-types";
import { Box, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export default function GobMxMobileMenuButton({ onOpen }) {
  return (
    <Box
      sx={{
        display: { xs: "flex", md: "none" },
        alignItems: "center",
      }}
    >
      <IconButton
        aria-label="Abrir menú"
        onClick={onOpen}
        sx={{
          color: "#ffffff",
          border: "1px solid rgba(255,255,255,0.25)",
          borderRadius: 1.8,
          transition: "all 200ms ease",
          "&:hover": {
            backgroundColor: "rgba(255,255,255,0.06)",
            transform: "translateY(-1px)",
          },
        }}
      >
        <MenuIcon />
      </IconButton>
    </Box>
  );
}

GobMxMobileMenuButton.propTypes = {
  onOpen: PropTypes.func.isRequired,
};