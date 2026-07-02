import { AppBar, Box, Toolbar } from "@mui/material";

import GobMxDesktopNav from "./gobmx/GobMxDesktopNav";
import GobMxHeaderLogo from "./gobmx/GobMxHeaderLogo";
import GobMxMobileDrawer from "./gobmx/GobMxMobileDrawer";
import GobMxMobileMenuButton from "./gobmx/GobMxMobileMenuButton";
import { useGobMxHeader } from "./gobmx/useGobMxHeader";

/**
 * Header institucional estilo Gobierno de México.
 * Adaptado a la estructura actual en React + Vite + JavaScript.
 *
 * @returns {JSX.Element}
 */
export default function GobMxHeader() {
  const {
    closeMenu,
    handleGoToLanding,
    menuItems,
    open,
    openMenu,
  } = useGobMxHeader();

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: "#621132",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <Toolbar
          sx={{
            minHeight: { xs: 72, md: 92 },
            px: { xs: 2, sm: 3, md: 8 },
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <GobMxHeaderLogo />

          <Box sx={{ flex: 1 }} />

          <GobMxDesktopNav onGoToLanding={handleGoToLanding} />

          <GobMxMobileMenuButton onOpen={openMenu} />
        </Toolbar>
      </AppBar>

      <GobMxMobileDrawer
        open={open}
        onClose={closeMenu}
        menuItems={menuItems}
      />
    </>
  );
}