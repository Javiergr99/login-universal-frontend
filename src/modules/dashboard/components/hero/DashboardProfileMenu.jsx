import { useState } from "react";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";

import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";

function getInitials(displayName) {
  const parts = String(displayName || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (parts.length === 0) {
    return "U";
  }

  return parts
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

export default function DashboardProfileMenu({
  displayName,
  loggingOut,
  onLogout,
  onViewProfile,
  onUpdateProfile,
}) {
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);

  const isProfileMenuOpen = Boolean(profileAnchorEl);
  const initials = getInitials(displayName);

  function openProfileMenu(event) {
    setProfileAnchorEl(event.currentTarget);
  }

  function closeProfileMenu() {
    setProfileAnchorEl(null);
  }

  function handleViewProfile() {
    closeProfileMenu();
    onViewProfile();
  }

  function handleUpdateProfile() {
    closeProfileMenu();
    onUpdateProfile();
  }

  function handleLogout() {
    closeProfileMenu();
    onLogout();
  }

  return (
    <>
      <Tooltip title="Perfil de usuario">
        <IconButton
          onClick={openProfileMenu}
          sx={{
            width: 78,
            height: "100%",
            minHeight: 76,
            borderRadius: "22px",
            background:
              "linear-gradient(135deg, #c40b48 0%, #9f2241 52%, #75102f 100%)",
            color: "#ffffff",
            boxShadow:
              "0 16px 36px rgba(159,34,65,0.26), inset 0 1px 0 rgba(255,255,255,0.30)",
            transition:
              "transform 220ms ease, box-shadow 220ms ease, background 220ms ease",
            position: "relative",
            overflow: "hidden",

            "&::before": {
              content: '""',
              position: "absolute",
              inset: 8,
              borderRadius: "18px",
              border: "1px solid rgba(255,255,255,0.18)",
              pointerEvents: "none",
            },

            "&::after": {
              content: '""',
              position: "absolute",
              width: 62,
              height: 110,
              top: -36,
              left: -28,
              transform: "rotate(28deg)",
              background: "rgba(255,255,255,0.18)",
              pointerEvents: "none",
            },

            "&:hover": {
              background:
                "linear-gradient(135deg, #d41454 0%, #9f2241 56%, #68102c 100%)",
              transform: "translateY(-2px)",
              boxShadow:
                "0 22px 46px rgba(159,34,65,0.32), inset 0 1px 0 rgba(255,255,255,0.34)",
            },

            "&:active": {
              transform: "translateY(0)",
            },
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: 52,
              height: 52,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1,
            }}
          >
            <Avatar
              sx={{
                width: 50,
                height: 50,
                bgcolor: "rgba(255,255,255,0.18)",
                color: "#ffffff",
                border: "1px solid rgba(255,255,255,0.28)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.22), 0 8px 18px rgba(15,23,42,0.12)",
              }}
            >
              <PersonRoundedIcon
                sx={{
                  fontSize: 30,
                  color: "#ffffff",
                  filter: "drop-shadow(0 2px 5px rgba(0,0,0,0.18))",
                }}
              />
            </Avatar>

            <Box
              sx={{
                position: "absolute",
                right: -4,
                bottom: -3,
                minWidth: 24,
                height: 24,
                px: 0.55,
                borderRadius: "999px",
                backgroundColor: "#ffffff",
                color: "#8f1538",
                border: "1px solid rgba(159,34,65,0.12)",
                boxShadow: "0 8px 18px rgba(15,23,42,0.16)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "Noto Sans, sans-serif",
                fontSize: "0.68rem",
                fontWeight: 950,
                lineHeight: 1,
              }}
            >
              {initials}
            </Box>
          </Box>
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={profileAnchorEl}
        open={isProfileMenuOpen}
        onClose={closeProfileMenu}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 250,
            borderRadius: "18px",
            boxShadow:
              "0 22px 50px rgba(15,23,42,0.16), inset 0 1px 0 rgba(255,255,255,0.9)",
            border: "1px solid rgba(15,23,42,0.06)",
            overflow: "hidden",
          },
        }}
      >
        <Box sx={{ px: 2, py: 1.5 }}>
          <Typography
            sx={{
              fontWeight: 950,
              color: "#1f2937",
              fontSize: "0.94rem",
            }}
          >
            {displayName}
          </Typography>

          <Typography
            sx={{
              color: "#64748b",
              fontSize: "0.78rem",
              mt: 0.3,
            }}
          >
            Perfil institucional
          </Typography>
        </Box>

        <Divider />

        <MenuItem onClick={handleViewProfile} sx={menuItemStyles}>
          <VisibilityRoundedIcon sx={menuIconStyles} />
          Ver perfil
        </MenuItem>

        <MenuItem onClick={handleUpdateProfile} sx={menuItemStyles}>
          <ManageAccountsRoundedIcon sx={menuIconStyles} />
          Actualizar datos
        </MenuItem>

        <Divider />

        <MenuItem
          onClick={handleLogout}
          disabled={loggingOut}
          sx={{
            ...menuItemStyles,
            color: "#8f1538",
            fontWeight: 950,
          }}
        >
          <LogoutRoundedIcon sx={{ ...menuIconStyles, color: "#8f1538" }} />
          {loggingOut ? "Cerrando sesión..." : "Cerrar sesión"}
        </MenuItem>
      </Menu>
    </>
  );
}

DashboardProfileMenu.propTypes = {
  displayName: PropTypes.string.isRequired,
  loggingOut: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired,
  onViewProfile: PropTypes.func.isRequired,
  onUpdateProfile: PropTypes.func.isRequired,
};

const menuItemStyles = {
  gap: 1.2,
  py: 1.25,
  px: 2,
  fontFamily: "Noto Sans, sans-serif",
  fontWeight: 850,
  color: "#334155",
};

const menuIconStyles = {
  fontSize: 21,
  color: "#8f1538",
};