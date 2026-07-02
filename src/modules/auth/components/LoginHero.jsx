import { Box, Typography } from "@mui/material";

export default function LoginHero() {
  return (
    <Box
      sx={{
        color: "#ffffff",
        maxWidth: "720px",
        px: { xs: 0.5, sm: 1, lg: 0 },
      }}
    >
      <Typography
        component="h1"
        sx={{
          fontFamily: "Noto Sans, sans-serif",
          fontSize: {
            xs: "3.15rem",
            sm: "4rem",
            md: "4.8rem",
            lg: "5.25rem",
          },
          fontWeight: 950,
          lineHeight: 0.95,
          letterSpacing: "-0.065em",
          maxWidth: "760px",
          color: "#ffffff",
          textShadow:
            "0 5px 18px rgba(0,0,0,0.60), 0 18px 48px rgba(0,0,0,0.42)",
        }}
      >
        Bienvenido
      </Typography>

      <Box
        sx={{
          width: { xs: 82, sm: 104 },
          height: 5,
          borderRadius: 999,
          mt: 2.4,
          mb: 2.8,
          background:
            "linear-gradient(90deg, #ffffff 0%, rgba(188,149,92,0.95) 100%)",
          boxShadow: "0 8px 22px rgba(255,255,255,0.20)",
        }}
      />

      <Typography
        sx={{
          fontFamily: "Noto Sans, sans-serif",
          fontSize: {
            xs: "1.22rem",
            sm: "1.38rem",
            md: "1.48rem",
          },
          fontWeight: 650,
          lineHeight: 1.65,
          color: "rgba(255,255,255,0.96)",
          maxWidth: "690px",
          textShadow:
            "0 3px 12px rgba(0,0,0,0.66), 0 12px 32px rgba(0,0,0,0.38)",
        }}
      >
        Accede al sistema de manera segura. Ingresa tu CURP y contraseña para
        continuar.
      </Typography>
    </Box>
  );
}