import PropTypes from "prop-types";
import {
  Box,
  Divider,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

import { MOBILE_ITEM_HEIGHT } from "./gobMxHeader.constants";

export default function GobMxMobileDrawerItem({ item, showDivider }) {
  return (
    <Box>
      <ListItemButton
        onClick={item.onClick}
        sx={{
          minHeight: `${MOBILE_ITEM_HEIGHT}px`,
          height: `${MOBILE_ITEM_HEIGHT}px`,
          justifyContent: "center",
          textAlign: "center",
          transition: "all 240ms ease",
          position: "relative",
          "&:hover": {
            backgroundColor: "rgba(255,255,255,0.02)",
            transform: "translateY(-1px)",
          },
          "&:active": {
            transform: "translateY(0px)",
            backgroundColor: "rgba(255,255,255,0.04)",
          },
        }}
      >
        <ListItemText
          primary={
            <Typography
              sx={{
                fontFamily: "Noto Sans, sans-serif",
                fontWeight: 600,
                fontSize: "15px",
                color: "#ffffff",
                letterSpacing: "0.25px",
                WebkitFontSmoothing: "antialiased",
                MozOsxFontSmoothing: "grayscale",
                transition: "all 200ms ease",
                ".MuiListItemButton-root:hover &": {
                  letterSpacing: "0.35px",
                },
              }}
            >
              {item.label}
            </Typography>
          }
        />
      </ListItemButton>

      {showDivider ? (
        <Divider sx={{ borderColor: "rgba(255,255,255,0.10)" }} />
      ) : null}
    </Box>
  );
}

GobMxMobileDrawerItem.propTypes = {
  item: PropTypes.shape({
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  }).isRequired,
  showDivider: PropTypes.bool.isRequired,
};