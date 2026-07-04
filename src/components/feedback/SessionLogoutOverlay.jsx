import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";

export default function SessionLogoutOverlay({ open = false }) {
  if (!open) return null;

  return (
    <Box
      role="alert"
      aria-live="assertive"
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        background:
          "linear-gradient(135deg, rgba(248,250,252,0.96), rgba(245,241,234,0.96))",
        backdropFilter: "blur(10px)",
        fontFamily: "Noto Sans, sans-serif",
        "@keyframes logoutCardIn": {
          "0%": {
            opacity: 0,
            transform: "translateY(10px)",
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
        "@keyframes logoutRing": {
          "0%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
        "@keyframes logoutLock": {
          "0%, 100%": {
            opacity: 0.72,
            transform: "translateY(0)",
          },
          "50%": {
            opacity: 1,
            transform: "translateY(-2px)",
          },
        },
        "@keyframes logoutBar": {
          "0%": {
            transform: "scaleX(0)",
            opacity: 0.45,
          },
          "50%": {
            transform: "scaleX(1)",
            opacity: 1,
          },
          "100%": {
            transform: "scaleX(0)",
            opacity: 0.45,
          },
        },
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 390,
          borderRadius: "28px",
          p: { xs: 3, sm: 3.5 },
          textAlign: "center",
          backgroundColor: "rgba(255,255,255,0.94)",
          border: "1px solid rgba(97,18,50,0.10)",
          boxShadow: "0 24px 70px rgba(15,23,42,0.12)",
          animation: "logoutCardIn 360ms ease-out both",
        }}
      >
        <Box
          sx={{
            width: 78,
            height: 78,
            mx: "auto",
            mb: 2.2,
            position: "relative",
            borderRadius: "50%",
            display: "grid",
            placeItems: "center",
            backgroundColor: "rgba(97,18,50,0.04)",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              border: "2px solid rgba(97,18,50,0.12)",
              borderTopColor: "#611232",
              animation: "logoutRing 1200ms linear infinite",
            }}
          />

          <Box
            sx={{
              width: 30,
              height: 24,
              borderRadius: "8px",
              border: "2.4px solid #611232",
              position: "relative",
              animation: "logoutLock 1300ms ease-in-out infinite",
              "&::before": {
                content: '""',
                position: "absolute",
                left: "50%",
                top: -17,
                width: 18,
                height: 18,
                borderRadius: "14px 14px 0 0",
                border: "2.4px solid #611232",
                borderBottom: "none",
                transform: "translateX(-50%)",
              },
              "&::after": {
                content: '""',
                position: "absolute",
                left: "50%",
                top: "50%",
                width: 4,
                height: 4,
                borderRadius: "50%",
                backgroundColor: "#611232",
                transform: "translate(-50%, -50%)",
              },
            }}
          />
        </Box>

        <Typography
          sx={{
            fontFamily: "Noto Sans, sans-serif",
            fontWeight: 950,
            color: "#611232",
            fontSize: { xs: "1.15rem", sm: "1.28rem" },
            letterSpacing: "-0.03em",
            mb: 0.7,
          }}
        >
          Cerrando sesión
        </Typography>

        <Typography
          sx={{
            fontFamily: "Noto Sans, sans-serif",
            color: "#64748b",
            fontSize: "0.94rem",
            lineHeight: 1.65,
            maxWidth: 310,
            mx: "auto",
          }}
        >
          Estamos protegiendo tu información. Serás redirigido al inicio de
          sesión.
        </Typography>

        <Box
          sx={{
            mt: 2.4,
            width: 160,
            height: 3,
            mx: "auto",
            borderRadius: 999,
            overflow: "hidden",
            backgroundColor: "rgba(97,18,50,0.10)",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              borderRadius: 999,
              backgroundColor: "#611232",
              transformOrigin: "left center",
              animation: "logoutBar 1400ms ease-in-out infinite",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}

SessionLogoutOverlay.propTypes = {
  open: PropTypes.bool,
};
