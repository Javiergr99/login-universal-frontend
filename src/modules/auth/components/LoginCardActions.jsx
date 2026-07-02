import PropTypes from "prop-types";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";

export default function LoginCardActions({
  remember,
  loading,
  canSubmit,
  onRememberChange,
  onForgotPassword,
}) {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              checked={remember}
              onChange={onRememberChange}
              sx={{
                color: "rgba(255,255,255,0.72)",
                "&.Mui-checked": {
                  color: "#ffffff",
                },
              }}
            />
          }
          label={
            <Typography
              sx={{
                fontSize: "0.88rem",
                color: "rgba(255,255,255,0.88)",
                fontFamily: "Noto Sans, sans-serif",
              }}
            >
              Recordar CURP
            </Typography>
          }
          sx={{ m: 0 }}
        />

        <Button
          variant="text"
          onClick={onForgotPassword}
          sx={{
            minWidth: "auto",
            p: 0,
            textTransform: "none",
            fontWeight: 700,
            color: "#ffffff",
            fontSize: "0.82rem",
            fontFamily: "Noto Sans, sans-serif",
            "&:hover": {
              backgroundColor: "transparent",
              textDecoration: "underline",
            },
          }}
        >
          ¿Olvidaste tu contraseña?
        </Button>
      </Box>

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
        {loading ? "Validando..." : "Iniciar sesión"}
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

LoginCardActions.propTypes = {
  remember: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  canSubmit: PropTypes.bool.isRequired,
  onRememberChange: PropTypes.func.isRequired,
  onForgotPassword: PropTypes.func.isRequired,
};