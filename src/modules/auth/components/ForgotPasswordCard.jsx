import PropTypes from "prop-types";
import { Box, Button, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import LoginBrandIcon from "./LoginBrandIcon";
import ForgotPasswordEmailField from "./ForgotPasswordEmailField";
import ForgotPasswordSubmittedMessage from "./ForgotPasswordSubmittedMessage";

export default function ForgotPasswordCard({
  email,
  emailError,
  loading,
  submitted,
  canSubmit,
  onEmailChange,
  onSubmit,
  onBackToLogin,
}) {
  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{
        width: "100%",
        maxWidth: "430px",
        borderRadius: "28px",
        backgroundColor: "rgba(255,255,255,0.14)",
        backdropFilter: "blur(18px)",
        border: "1px solid rgba(255,255,255,0.22)",
        boxShadow: "0 20px 45px rgba(0, 0, 0, 0.22)",
        p: { xs: 3, sm: 4 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      <LoginBrandIcon alt="Recuperación de acceso" />

      <Typography
        sx={{
          fontFamily: "Noto Sans, sans-serif",
          fontSize: "1.5rem",
          fontWeight: 600,
          lineHeight: 1.15,
          color: "#ffffff",
          textAlign: "center",
        }}
      >
        ¿Olvidaste tu contraseña?
      </Typography>

      <Typography
        sx={{
          fontFamily: "Noto Sans, sans-serif",
          fontSize: "0.92rem",
          color: "rgba(255,255,255,0.82)",
          mt: 1,
          mb: 2.3,
          textAlign: "center",
        }}
      >
        Te ayudaremos a recuperar tu acceso de forma segura.
      </Typography>

      {!submitted ? (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.8 }}>
          <ForgotPasswordEmailField
            value={email}
            errorMessage={emailError}
            onChange={onEmailChange}
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            disabled={!canSubmit}
            sx={{
              textTransform: "none",
              py: 1.45,
              mt: 0.5,
              borderRadius: 999,
              fontWeight: 800,
              fontFamily: "Noto Sans, sans-serif",
              boxShadow: "0 8px 20px rgba(0,0,0,0.18)",
              backgroundColor: "#ffffff",
              color: "#0f172a",
              transition: "all 0.25s ease",
              "&:hover": {
                backgroundColor: "#f3f4f6",
                transform: "translateY(-2px)",
                boxShadow: "0 14px 28px rgba(0,0,0,0.24)",
              },
              "&:active": {
                transform: "translateY(0)",
              },
              "&.Mui-disabled": {
                background: "rgba(255,255,255,0.45)",
                color: "rgba(15,23,42,0.55)",
                boxShadow: "none",
              },
            }}
          >
            {loading ? "Enviando..." : "Enviar instrucciones"}
          </Button>
        </Box>
      ) : (
        <ForgotPasswordSubmittedMessage email={email} />
      )}

      <Button
        variant="text"
        onClick={onBackToLogin}
        startIcon={<FontAwesomeIcon icon={faArrowLeft} />}
        sx={{
          mt: 2.2,
          minWidth: "auto",
          p: 0,
          textTransform: "none",
          fontWeight: 700,
          color: "#ffffff",
          fontSize: "0.9rem",
          fontFamily: "Noto Sans, sans-serif",
          "&:hover": {
            backgroundColor: "transparent",
            textDecoration: "underline",
          },
        }}
      >
        Volver al inicio de sesión
      </Button>

      <Typography
        sx={{
          textAlign: "center",
          fontSize: "0.75rem",
          color: "rgba(255,255,255,0.68)",
          pt: 2,
          fontFamily: "Noto Sans, sans-serif",
        }}
      >
        Acceso restringido a personal autorizado
      </Typography>
    </Box>
  );
}

ForgotPasswordCard.propTypes = {
  email: PropTypes.string.isRequired,
  emailError: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  submitted: PropTypes.bool.isRequired,
  canSubmit: PropTypes.bool.isRequired,
  onEmailChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onBackToLogin: PropTypes.func.isRequired,
};