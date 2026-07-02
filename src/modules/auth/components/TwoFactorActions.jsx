import PropTypes from "prop-types";
import { Button, Typography } from "@mui/material";

export default function TwoFactorActions({
  canSubmit,
  loading,
  isSetupMode,
  qrLoading,
  onBackToLogin,
}) {
  return (
    <>
      <Button
        fullWidth
        type="submit"
        variant="contained"
        disabled={!canSubmit || (isSetupMode && qrLoading)}
        sx={{
          textTransform: "none",
          py: 1.45,
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
        {loading
          ? "Validando..."
          : isSetupMode
            ? "Activar y continuar"
            : "Confirmar verificación"}
      </Button>

      <Button
        type="button"
        variant="text"
        onClick={onBackToLogin}
        sx={{
          textTransform: "none",
          fontWeight: 700,
          color: "#ffffff",
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
          pt: 0.5,
          fontFamily: "Noto Sans, sans-serif",
        }}
      >
        Acceso restringido a personal autorizado
      </Typography>
    </>
  );
}

TwoFactorActions.propTypes = {
  canSubmit: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  isSetupMode: PropTypes.bool.isRequired,
  qrLoading: PropTypes.bool.isRequired,
  onBackToLogin: PropTypes.func.isRequired,
};