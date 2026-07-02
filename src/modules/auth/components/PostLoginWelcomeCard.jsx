import PropTypes from "prop-types";
import { Box, Stack, Typography } from "@mui/material";

import PostLoginLoadingBadge from "./PostLoginLoadingBadge";
import PostLoginProgressBar from "./PostLoginProgressBar";
import PostLoginSuccessIcon from "./PostLoginSuccessIcon";

export default function PostLoginWelcomeCard({
  displayName,
  loadingMessage,
  redirectDelayMs,
}) {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 720,
        position: "relative",
        zIndex: 1,
        borderRadius: { xs: "28px", sm: "36px" },
        p: "1px",
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.36), rgba(188,149,92,0.36))",
        boxShadow:
          "0 34px 100px rgba(15, 23, 42, 0.16), 0 10px 34px rgba(159,34,65,0.08)",
        animation: "cardEnter 520ms cubic-bezier(0.22, 1, 0.36, 1) both",
      }}
    >
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          borderRadius: { xs: "27px", sm: "35px" },
          px: { xs: 3, sm: 5.5 },
          py: { xs: 4.5, sm: 5.5 },
          textAlign: "center",
          background: "rgba(255,255,255,0.78)",
          backdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.52)",

          "&::after": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.95), transparent)",
          },
        }}
      >
        <Stack alignItems="center" spacing={2.4}>
          <PostLoginSuccessIcon />

          <Box>
            <Typography
              sx={{
                fontFamily: "'Noto Sans', sans-serif",
                fontWeight: 900,
                color: "#111827",
                fontSize: { xs: "1.65rem", sm: "2.35rem" },
                lineHeight: 1.08,
                letterSpacing: "-0.045em",
                mb: 1,
              }}
            >
              Acceso verificado
            </Typography>

            <Typography
              sx={{
                fontFamily: "'Noto Sans', sans-serif",
                color: "#374151",
                fontSize: { xs: "1rem", sm: "1.08rem" },
                lineHeight: 1.55,
                fontWeight: 600,
              }}
            >
              Bienvenido, {displayName}
            </Typography>
          </Box>

          <PostLoginLoadingBadge message={loadingMessage} />

          <PostLoginProgressBar durationMs={redirectDelayMs} />

          <Typography
            sx={{
              fontFamily: "'Noto Sans', sans-serif",
              color: "#94a3b8",
              fontSize: "0.76rem",
              fontWeight: 800,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Registro de Medidas de Protección
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}

PostLoginWelcomeCard.propTypes = {
  displayName: PropTypes.string.isRequired,
  loadingMessage: PropTypes.string.isRequired,
  redirectDelayMs: PropTypes.number.isRequired,
};