import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import routes from "../../../app/routes";

export function useGobMxHeader() {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));

  const closeMenu = useCallback(() => {
    setOpen(false);
  }, []);

  const openMenu = useCallback(() => {
    setOpen(true);
  }, []);

  const handleGoToLanding = useCallback(() => {
    closeMenu();

    navigate(routes.root || "/", {
      replace: false,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [closeMenu, navigate]);

  const menuItems = useMemo(
    () => [
      {
        label: "Trámites",
        onClick: closeMenu,
      },
      {
        label: "Gobierno",
        onClick: closeMenu,
      },
      {
        label: "Por Tus Derechos",
        onClick: handleGoToLanding,
      },
    ],
    [closeMenu, handleGoToLanding]
  );

  useEffect(() => {
    if (mdUp && open) {
      closeMenu();
    }
  }, [closeMenu, mdUp, open]);

  return {
    closeMenu,
    handleGoToLanding,
    menuItems,
    open,
    openMenu,
  };
}