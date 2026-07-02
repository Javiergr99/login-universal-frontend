import PropTypes from "prop-types";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import GobMxMobileDrawerItem from "./GobMxMobileDrawerItem";
import GobMxMobileSearchButton from "./GobMxMobileSearchButton";
import { GobMxHeaderMobileLogo } from "./GobMxHeaderLogo";

export default function GobMxMobileDrawer({ open, onClose, menuItems }) {
  return (
    <Drawer
      anchor="top"
      open={open}
      onClose={onClose}
      transitionDuration={{ enter: 320, exit: 240 }}
      ModalProps={{
        keepMounted: true,
      }}
      PaperProps={{
        sx: {
          backgroundColor: "#621132",
          backgroundImage: "none",
          color: "#ffffff",
          borderBottom: "1px solid rgba(255,255,255,0.10)",
          height: "auto",
          minHeight: 0,
          maxHeight: "none",
          overflow: "hidden",
        },
      }}
    >
      <Box
        sx={{
          px: 2.5,
          pt: 2,
          pb: 1.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <GobMxHeaderMobileLogo />

        <IconButton
          aria-label="Cerrar menú"
          onClick={onClose}
          sx={{
            color: "#ffffff",
            border: "1px solid rgba(255,255,255,0.20)",
            borderRadius: 999,
            p: 1,
            transition: "all 200ms ease",
            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.08)",
              transform: "rotate(90deg)",
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.12)" }} />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          pt: 0,
          pb: 2,
        }}
      >
        <List sx={{ width: "100%" }}>
          {menuItems.map((item, index) => (
            <GobMxMobileDrawerItem
              key={item.label}
              item={item}
              showDivider={index < menuItems.length - 1}
            />
          ))}
        </List>

        <GobMxMobileSearchButton onClose={onClose} />
      </Box>
    </Drawer>
  );
}

GobMxMobileDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired,
    })
  ).isRequired,
};