import { Box, Typography } from "@mui/material";

export default function MexicoStateEmptyPanel() {
  return (
    <Box>
      <Typography
        sx={{
          fontFamily: '"Patria", serif',
          fontSize: { xs: "1.55rem", md: "1.9rem" },
          lineHeight: 1.05,
          fontWeight: 700,
          color: "#1f1f1f",
          mb: 1.2,
        }}
      >
        Selecciona una entidad
      </Typography>

      <Typography
        sx={{
          fontFamily: '"Noto Sans", sans-serif',
          fontSize: { xs: "0.9rem", md: "0.92rem" },
          lineHeight: 1.6,
          color: "#666666",
          fontWeight: 400,
        }}
      >
        Haz clic sobre un estado del mapa para consultar la información
        institucional disponible de esa entidad federativa.
      </Typography>
    </Box>
  );
}