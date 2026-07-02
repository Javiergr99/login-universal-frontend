import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";

import LoginBrandIcon from "./LoginBrandIcon";
import LoginCurpField from "./LoginCurpField";
import LoginPasswordField from "./LoginPasswordField";
import LoginCardActions from "./LoginCardActions";

export default function LoginAccessCard({
  curp,
  password,
  remember,
  loading,
  showPassword,
  canSubmit,
  onSubmit,
  onCurpChange,
  onPasswordChange,
  onRememberChange,
  onTogglePasswordVisibility,
  onForgotPassword,
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
      <LoginBrandIcon />

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
        Accede a tu cuenta
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
        Ingresa tu CURP y contraseña para continuar.
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.8 }}>
        <LoginCurpField value={curp} onChange={onCurpChange} />

        <LoginPasswordField
          value={password}
          showPassword={showPassword}
          onChange={onPasswordChange}
          onTogglePasswordVisibility={onTogglePasswordVisibility}
        />

        <LoginCardActions
          remember={remember}
          loading={loading}
          canSubmit={canSubmit}
          onRememberChange={onRememberChange}
          onForgotPassword={onForgotPassword}
        />
      </Box>
    </Box>
  );
}

LoginAccessCard.propTypes = {
  curp: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  remember: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  showPassword: PropTypes.bool.isRequired,
  canSubmit: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCurpChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  onRememberChange: PropTypes.func.isRequired,
  onTogglePasswordVisibility: PropTypes.func.isRequired,
  onForgotPassword: PropTypes.func.isRequired,
};