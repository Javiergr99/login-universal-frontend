import { Box, Typography } from "@mui/material";

export default function ForgotPasswordHero() {
  return (
    <Box sx={{ color: "#ffffff" }}>
      <Typography
        sx={{
          fontFamily: "Noto Sans, sans-serif",
          fontSize: { xs: "2.1rem", md: "3rem" },
          fontWeight: 600,
          lineHeight: 1.08,
          maxWidth: "680px",
        }}
      >
        Recupera el acceso a tu cuenta
      </Typography>

      <Typography
        sx={{
          fontFamily: "Noto Sans, sans-serif",
          fontSize: { xs: "1rem", md: "1.05rem" },
          fontWeight: 400,
          lineHeight: 1.8,
          mt: 2.5,
          opacity: 0.94,
          maxWidth: "620px",
        }}
      >
        Ingresa tu correo institucional para recibir las instrucciones de
        recuperación de contraseña.
      </Typography>
    </Box>
  );
}