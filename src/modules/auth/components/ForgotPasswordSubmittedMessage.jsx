import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";

export default function ForgotPasswordSubmittedMessage({ email }) {
  return (
    <Box
      sx={{
        borderRadius: "18px",
        backgroundColor: "rgba(255,255,255,0.10)",
        border: "1px solid rgba(255,255,255,0.18)",
        p: 2.2,
      }}
    >
      <Typography
        sx={{
          fontFamily: "Noto Sans, sans-serif",
          fontWeight: 700,
          color: "#ffffff",
          fontSize: "1rem",
          mb: 1,
        }}
      >
        Solicitud enviada
      </Typography>

      <Typography
        sx={{
          fontFamily: "Noto Sans, sans-serif",
          color: "rgba(255,255,255,0.84)",
          fontSize: "0.92rem",
          lineHeight: 1.7,
        }}
      >
        Si el correo <strong>{email}</strong> existe en el sistema, recibirás
        instrucciones para restablecer tu contraseña.
      </Typography>
    </Box>
  );
}

ForgotPasswordSubmittedMessage.propTypes = {
  email: PropTypes.string.isRequired,
};