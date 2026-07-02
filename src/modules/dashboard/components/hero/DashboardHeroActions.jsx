import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";

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
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr auto",
        gap: 1,
        width: "100%",
        alignItems: "stretch",
      }}
    >
      <Box sx={statCardStyles}>
        <Typography sx={statNumberWineStyles}>{registriesCount}</Typography>

        <Typography sx={statLabelStyles}>Módulos</Typography>
      </Box>

      <DashboardProfileMenu
        displayName={displayName}
        loggingOut={loggingOut}
        onLogout={onLogout}
        onViewProfile={onViewProfile}
        onUpdateProfile={onUpdateProfile}
      />
    </Box>
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

const statCardStyles = {
  borderRadius: "18px",
  p: 1.6,
  background: "rgba(255,255,255,0.66)",
  border: "1px solid rgba(15,23,42,0.06)",
};

const statNumberWineStyles = {
  fontFamily: "Noto Sans, sans-serif",
  fontWeight: 950,
  color: "#8f1538",
  fontSize: "1.45rem",
  lineHeight: 1,
};

const statLabelStyles = {
  fontFamily: "Noto Sans, sans-serif",
  color: "#64748b",
  fontSize: "0.74rem",
  fontWeight: 800,
  mt: 0.4,
};