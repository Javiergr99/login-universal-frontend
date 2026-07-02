import { Box, Typography } from "@mui/material";

export default function MapLoadingFallback() {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: { xs: 420, sm: 500, md: 560 },
        borderRadius: { xs: "16px", md: "20px" },
        background:
          "linear-gradient(135deg, #f7f3ef 0%, #eeeeee 48%, #e7e2dd 100%)",
        border: "1px solid #dfdfdf",
        boxShadow: "0 18px 45px rgba(0,0,0,0.06)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        textAlign: "center",
      }}
    >
      <Typography
        sx={{
          fontFamily: '"Noto Sans", sans-serif',
          fontWeight: 800,
          color: "#8a0f3d",
          fontSize: { xs: "0.95rem", md: "1rem" },
        }}
      >
        Cargando mapa interactivo…
      </Typography>
    </Box>
  );
}