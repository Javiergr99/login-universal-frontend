import PropTypes from "prop-types";
import { Box, Stack, Typography } from "@mui/material";

import DashboardProfileMenu from "./DashboardProfileMenu";

export default function DashboardHeroActions({
  registriesCount,
  displayName,
  loggingOut,
  onLogout,
  onViewProfile,
  onUpdateProfile,
}) {
  return (
    <Stack
      direction="row"
      spacing={1.2}
      alignItems="stretch"
      sx={{
        width: { xs: "100%", md: "auto" },
      }}
    >
      <Box
        sx={{
          minWidth: { xs: 0, sm: 142 },
          flex: { xs: 1, md: "initial" },
          borderRadius: "16px",
          px: 2,
          py: 1.35,
          backgroundColor: "#ffffff",
          border: "1px solid rgba(15,23,42,0.08)",
          boxShadow: "0 10px 24px rgba(15,23,42,0.04)",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Noto Sans, sans-serif",
            fontWeight: 950,
            color: "#611232",
            fontSize: "1.35rem",
            lineHeight: 1,
          }}
        >
          {registriesCount}
        </Typography>

        <Typography
          sx={{
            fontFamily: "Noto Sans, sans-serif",
            color: "#64748b",
            fontSize: "0.73rem",
            fontWeight: 850,
            mt: 0.5,
          }}
        >
          Módulos activos
        </Typography>
      </Box>

      <DashboardProfileMenu
        displayName={displayName}
        loggingOut={loggingOut}
        onLogout={onLogout}
        onViewProfile={onViewProfile}
        onUpdateProfile={onUpdateProfile}
      />
    </Stack>
  );
}

DashboardHeroActions.propTypes = {
  registriesCount: PropTypes.number.isRequired,
  displayName: PropTypes.string.isRequired,
  loggingOut: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired,
  onViewProfile: PropTypes.func.isRequired,
  onUpdateProfile: PropTypes.func.isRequired,
};
