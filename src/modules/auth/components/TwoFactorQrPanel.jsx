import PropTypes from "prop-types";
import { Alert, Box, Divider, Stack } from "@mui/material";

export default function TwoFactorQrPanel({ qrLoading, qrImageUrl }) {
  return (
    <Stack spacing={2}>
      {qrLoading ? (
        <Alert
          severity="info"
          sx={{
            borderRadius: 3,
            backgroundColor: "rgba(255,255,255,0.92)",
          }}
        >
          Generando código QR…
        </Alert>
      ) : qrImageUrl ? (
        <Box
          data-testid="two-factor-qr-panel"
          sx={{
            display: "flex",
            justifyContent: "center",
            p: 2,
            borderRadius: 3,
            backgroundColor: "#ffffff",
          }}
        >
          <Box
            component="img"
            src={qrImageUrl}
            alt="Código QR para autenticación en dos pasos"
            sx={{
              width: 220,
              maxWidth: "100%",
              height: "auto",
              display: "block",
            }}
          />
        </Box>
      ) : (
        <Alert
          severity="warning"
          sx={{
            borderRadius: 3,
            backgroundColor: "rgba(255,255,255,0.92)",
          }}
        >
          No fue posible cargar el código QR.
        </Alert>
      )}

      <Divider
        sx={{
          borderColor: "rgba(255,255,255,0.14)",
        }}
      />
    </Stack>
  );
}

TwoFactorQrPanel.propTypes = {
  qrLoading: PropTypes.bool.isRequired,
  qrImageUrl: PropTypes.string,
};