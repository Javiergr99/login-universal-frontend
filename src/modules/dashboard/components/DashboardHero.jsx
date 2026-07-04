import PropTypes from "prop-types";
import { Box, Stack, Typography } from "@mui/material";

import DashboardCustomizeRoundedIcon from "@mui/icons-material/DashboardCustomizeRounded";

import DashboardHeroActions from "./hero/DashboardHeroActions";

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
      component="section"
      sx={{
        mb: { xs: 3.2, md: 4 },
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", md: "center" }}
        spacing={2.5}
      >
        <Stack direction="row" spacing={2.2} alignItems="flex-start">
          <Box
            sx={{
              width: 42,
              height: 42,
              minWidth: 42,
              borderRadius: "14px",
              color: "#9f2241",
              backgroundColor: "rgba(97,18,50,0.055)",
              border: "1px solid rgba(97,18,50,0.10)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mt: 0.4,
            }}
          >
            <DashboardCustomizeRoundedIcon sx={{ fontSize: 25 }} />
          </Box>

          <Box>
            <Typography
              component="h1"
              sx={{
                fontFamily: "Noto Sans, sans-serif",
                fontWeight: 950,
                fontSize: {
                  xs: "1.75rem",
                  sm: "2.15rem",
                  md: "2.55rem",
                },
                color: "#111827",
                lineHeight: 1.05,
                letterSpacing: "-0.052em",
                mb: 0.8,
              }}
            >
              Módulos de registros disponibles
            </Typography>

            <Typography
              sx={{
                fontFamily: "Noto Sans, sans-serif",
                color: "#64748b",
                fontSize: { xs: "0.95rem", sm: "1.02rem" },
                lineHeight: 1.65,
                maxWidth: 820,
              }}
            >
              Bienvenido,{" "}
              <Box
                component="span"
                sx={{
                  color: "#611232",
                  fontWeight: 950,
                }}
              >
                {displayName}
              </Box>
              . Selecciona un módulo para explorar y consultar la información
              disponible.
            </Typography>
          </Box>
        </Stack>

        <DashboardHeroActions
          registriesCount={registriesCount}
          displayName={displayName}
          loggingOut={loggingOut}
          onLogout={onLogout}
          onViewProfile={onViewProfile}
          onUpdateProfile={onUpdateProfile}
        />
      </Stack>
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
