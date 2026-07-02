import PropTypes from "prop-types";
import { Box, Stack, Typography } from "@mui/material";

const instructionTextStyles = {
  fontFamily: "Noto Sans, sans-serif",
  color: "rgba(255,255,255,0.94)",
  fontSize: { xs: "0.98rem", sm: "1.04rem" },
  fontWeight: 650,
  lineHeight: 1.55,
  textShadow:
    "0 3px 12px rgba(0,0,0,0.62), 0 10px 28px rgba(0,0,0,0.34)",
};

export default function TwoFactorHero({ isSetupMode }) {
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
        data-testid="two-factor-page-title"
        sx={{
          fontFamily: "Noto Sans, sans-serif",
          fontSize: {
            xs: "2.65rem",
            sm: "3.35rem",
            md: "4rem",
            lg: "4.35rem",
          },
          fontWeight: 950,
          lineHeight: 0.98,
          letterSpacing: "-0.06em",
          maxWidth: "760px",
          color: "#ffffff",
          textShadow:
            "0 5px 18px rgba(0,0,0,0.60), 0 18px 48px rgba(0,0,0,0.42)",
        }}
      >
        {isSetupMode
          ? "Configura tu autenticación en dos pasos"
          : "Verifica tu acceso seguro"}
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
            xs: "1.12rem",
            sm: "1.25rem",
            md: "1.34rem",
          },
          fontWeight: 650,
          lineHeight: 1.65,
          color: "rgba(255,255,255,0.96)",
          maxWidth: "700px",
          textShadow:
            "0 3px 12px rgba(0,0,0,0.66), 0 12px 32px rgba(0,0,0,0.38)",
        }}
      >
        {isSetupMode
          ? "Es obligatorio configurar la autenticación en dos pasos para proteger tu cuenta. Escanea el código QR con Google Authenticator o Microsoft Authenticator y captura el código generado."
          : "Ingresa el código de seis dígitos generado por tu aplicación autenticadora para completar el acceso a la plataforma."}
      </Typography>

      <Stack spacing={1.35} sx={{ mt: 3.5 }}>
        {isSetupMode ? (
          <>
            <Typography sx={instructionTextStyles}>
              • Abre Google Authenticator o Microsoft Authenticator.
            </Typography>

            <Typography sx={instructionTextStyles}>
              • Escanea el código QR que se muestra en pantalla.
            </Typography>

            <Typography sx={instructionTextStyles}>
              • Captura el código actual de seis dígitos para activar tu acceso.
            </Typography>
          </>
        ) : (
          <>
            <Typography sx={instructionTextStyles}>
              • Abre tu aplicación autenticadora y localiza el código vigente.
            </Typography>

            <Typography sx={instructionTextStyles}>
              • Verifica que la hora del dispositivo esté configurada
              automáticamente.
            </Typography>

            <Typography sx={instructionTextStyles}>
              • Captura el código actual de seis dígitos para continuar.
            </Typography>
          </>
        )}
      </Stack>
    </Box>
  );
}

TwoFactorHero.propTypes = {
  isSetupMode: PropTypes.bool.isRequired,
};