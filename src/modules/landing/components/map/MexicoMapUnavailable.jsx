import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";

export default function MexicoMapUnavailable({ loading = false }) {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 560,
        mx: "auto",
        textAlign: "center",
        px: 2,
      }}
    >
      <Typography
        sx={{
          fontFamily: '"Patria", serif',
          fontSize: { xs: "1.45rem", sm: "1.7rem", md: "2rem" },
          lineHeight: 1.05,
          fontWeight: 700,
          color: "#4a4a4a",
          mb: 1.2,
        }}
      >
        {loading ? "Cargando mapa..." : "Mapa no disponible"}
      </Typography>

      <Typography
        sx={{
          fontFamily: '"Noto Sans", sans-serif',
          fontSize: { xs: "0.9rem", md: "0.95rem" },
          lineHeight: 1.6,
          color: "#6f6f6f",
          fontWeight: 500,
        }}
      >
        {loading
          ? "Estamos preparando la información geográfica de las entidades federativas."
          : "No fue posible cargar la información geográfica del mapa. Revisa el archivo mexico-states.topojson."}
      </Typography>
    </Box>
  );
}

MexicoMapUnavailable.propTypes = {
  loading: PropTypes.bool,
};