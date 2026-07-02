import PropTypes from "prop-types";
import { Alert, Box, Stack, Typography } from "@mui/material";

import LoginBrandIcon from "./LoginBrandIcon";
import TwoFactorActions from "./TwoFactorActions";
import TwoFactorCodeField from "./TwoFactorCodeField";
import TwoFactorQrPanel from "./TwoFactorQrPanel";

export default function TwoFactorCard({
  activeChallenge,
  canSubmit,
  isSetupMode,
  loading,
  onBackToLogin,
  onCodeChange,
  onSubmit,
  qrImageUrl,
  qrLoading,
  verificationCode,
}) {
  const accountLabel = activeChallenge?.userHint || activeChallenge?.curp || "";

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{
        width: "100%",
        maxWidth: 490,
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
      <LoginBrandIcon alt="Verificación en dos pasos" />

      <Typography
        component="h2"
        sx={{
          fontFamily: "Noto Sans, sans-serif",
          fontSize: "1.45rem",
          fontWeight: 600,
          lineHeight: 1.15,
          color: "#ffffff",
          textAlign: "center",
        }}
      >
        {isSetupMode
          ? "Configura tu autenticador"
          : "Ingresa tu código de verificación"}
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
        {accountLabel
          ? `Cuenta: ${accountLabel}`
          : "Continúa con la verificación de seguridad."}
      </Typography>

      {activeChallenge?.message ? (
        <Alert
          severity="info"
          sx={{
            mb: 2,
            borderRadius: 3,
            backgroundColor: "rgba(255,255,255,0.92)",
          }}
        >
          {activeChallenge.message}
        </Alert>
      ) : null}

      {isSetupMode ? (
        <TwoFactorQrPanel qrLoading={qrLoading} qrImageUrl={qrImageUrl} />
      ) : null}

      <Stack spacing={1.8} sx={{ mt: 2 }}>
        <TwoFactorCodeField value={verificationCode} onChange={onCodeChange} />

        <TwoFactorActions
          canSubmit={canSubmit}
          loading={loading}
          isSetupMode={isSetupMode}
          qrLoading={qrLoading}
          onBackToLogin={onBackToLogin}
        />
      </Stack>
    </Box>
  );
}

TwoFactorCard.propTypes = {
  activeChallenge: PropTypes.shape({
    curp: PropTypes.string,
    message: PropTypes.string,
    userHint: PropTypes.string,
  }),
  canSubmit: PropTypes.bool.isRequired,
  isSetupMode: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  onBackToLogin: PropTypes.func.isRequired,
  onCodeChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  qrImageUrl: PropTypes.string,
  qrLoading: PropTypes.bool.isRequired,
  verificationCode: PropTypes.string.isRequired,
};