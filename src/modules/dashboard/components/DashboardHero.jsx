import PropTypes from "prop-types";
import { Box, Stack, Typography } from "@mui/material";

import DashboardHeroActions from "./hero/DashboardHeroActions";
import DashboardHeroBadges from "./hero/DashboardHeroBadges";

export default function DashboardHero({
  displayName,
  registriesCount,
  loggingOut,
  onLogout,
  onViewProfile,
  onUpdateProfile,
}) {
  return (
    <Box
      sx={{
        mb: { xs: 3, md: 4 },
        borderRadius: { xs: "28px", md: "36px" },
        p: "1px",
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.42), rgba(188,149,92,0.28))",
        boxShadow:
          "0 28px 80px rgba(15,23,42,0.10), 0 10px 30px rgba(159,34,65,0.06)",
      }}
    >
      <Box
        sx={{
          borderRadius: { xs: "27px", md: "35px" },
          p: { xs: 3, sm: 3.5, md: 4 },
          background: "rgba(255,255,255,0.80)",
          border: "1px solid rgba(255,255,255,0.72)",
          backdropFilter: "blur(22px)",
          position: "relative",
          overflow: "hidden",

          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(120deg, rgba(255,255,255,0.42), transparent 38%, rgba(188,149,92,0.07))",
            pointerEvents: "none",
          },
        }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", md: "center" }}
          spacing={3}
          sx={{ position: "relative", zIndex: 1 }}
        >
          <Box sx={{ maxWidth: 760 }}>
            <DashboardHeroBadges />

            <Typography
              component="h1"
              sx={{
                fontFamily: "Noto Sans, sans-serif",
                fontWeight: 950,
                fontSize: {
                  xs: "1.9rem",
                  sm: "2.35rem",
                  md: "2.8rem",
                },
                color: "#111827",
                lineHeight: 1.03,
                letterSpacing: "-0.055em",
                mb: 1.3,
              }}
            >
              Registros disponibles
            </Typography>

            <Typography
              sx={{
                fontFamily: "Noto Sans, sans-serif",
                color: "#64748b",
                fontSize: { xs: "0.96rem", sm: "1.02rem" },
                lineHeight: 1.75,
                maxWidth: 760,
              }}
            >
              Bienvenido,{" "}
              <Box
                component="span"
                sx={{
                  color: "#8f1538",
                  fontWeight: 950,
                }}
              >
                {displayName}
              </Box>
              . Selecciona el registro al que deseas ingresar para continuar
              con tus actividades dentro de la plataforma.
            </Typography>
          </Box>

          <Stack
            spacing={1.4}
            alignItems={{ xs: "stretch", md: "flex-end" }}
            sx={{
              width: { xs: "100%", md: "auto" },
              minWidth: { md: 260 },
            }}
          >
            <DashboardHeroActions
              registriesCount={registriesCount}
              displayName={displayName}
              loggingOut={loggingOut}
              onLogout={onLogout}
              onViewProfile={onViewProfile}
              onUpdateProfile={onUpdateProfile}
            />
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}

DashboardHero.propTypes = {
  displayName: PropTypes.string.isRequired,
  registriesCount: PropTypes.number.isRequired,
  loggingOut: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired,
  onViewProfile: PropTypes.func.isRequired,
  onUpdateProfile: PropTypes.func.isRequired,
};