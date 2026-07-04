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
        maxWidth: 520,
        position: "relative",
        zIndex: 1,
        borderRadius: { xs: "26px", sm: "30px" },
        backgroundColor: "rgba(255,255,255,0.94)",
        border: "1px solid rgba(97,18,50,0.08)",
        boxShadow:
          "0 24px 70px rgba(15, 23, 42, 0.10), 0 8px 24px rgba(97,18,50,0.045)",
        animation: "cardEnter 420ms ease-out both",
      }}
    >
      <Box
        sx={{
          px: { xs: 3, sm: 4.5 },
          py: { xs: 4, sm: 4.8 },
          textAlign: "center",
        }}
      >
        <Stack alignItems="center" spacing={2.15}>
          <PostLoginSuccessIcon />

          <Box>
            <Typography
              sx={{
                fontFamily: "'Noto Sans', sans-serif",
                fontWeight: 950,
                color: "#111827",
                fontSize: { xs: "1.55rem", sm: "1.95rem" },
                lineHeight: 1.12,
                letterSpacing: "-0.045em",
                mb: 0.8,
              }}
            >
              Acceso verificado
            </Typography>

            <Typography
              sx={{
                fontFamily: "'Noto Sans', sans-serif",
                color: "#64748b",
                fontSize: { xs: "0.96rem", sm: "1rem" },
                lineHeight: 1.55,
                fontWeight: 650,
              }}
            >
              Bienvenido,{" "}
              <Box
                component="span"
                sx={{
                  color: "#611232",
                  fontWeight: 850,
                }}
              >
                {displayName}
              </Box>
            </Typography>
          </Box>

          <PostLoginLoadingBadge message={loadingMessage} />

          <PostLoginProgressBar durationMs={redirectDelayMs} />

          <Typography
            sx={{
              pt: 0.35,
              fontFamily: "'Noto Sans', sans-serif",
              color: "#94a3b8",
              fontSize: "0.72rem",
              fontWeight: 800,
              letterSpacing: "0.075em",
              textTransform: "uppercase",
            }}
          >
            Redirigiendo de forma segura
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
