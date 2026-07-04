import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { useSnackbar } from "notistack";

import routes from "../../../app/routes";
import { useAuth } from "../../../hooks/useAuth";
import {
  buildRedirectCodeUrl,
  getCleanRedirectUrl,
} from "../../../utils/authRedirect";
import { createRedirectCodeRequest } from "../../auth/services/auth.service";

import DashboardHero from "../components/DashboardHero";
import DashboardModulesPanel from "../components/DashboardModulesPanel";
import {
  getAllowedRegistriesFromUser,
  getDashboardDisplayName,
  getStoredDashboardUser,
} from "../utils/dashboard.utils";

function getAccessDeniedMessage(deniedGroupCode) {
  const groupLabels = {
    MP: "Registro de Medidas de Protección",
    MH: "Registro de Movilidad Humana",
    RNCAS: "Registro Nacional de Centros de Asistencia Social",
    VF: "Registro del Derecho a Vivir en Familia",
  };

  const moduleName = groupLabels[deniedGroupCode];

  if (moduleName) {
    return `No tienes permisos suficientes para acceder a ${moduleName}.`;
  }

  return "No tienes permisos suficientes para acceder a ese módulo.";
}

function isExternalUrl(value) {
  if (!value) return false;

  try {
    const targetUrl = new URL(value, window.location.origin);
    return targetUrl.origin !== window.location.origin;
  } catch {
    return false;
  }
}

export default function DashboardPage() {
  const navigate = useNavigate();
  const { pathname, state: routeState } = useLocation();
  const { enqueueSnackbar } = useSnackbar();
  const { logout, user: authUser } = useAuth();

  const [loggingOut, setLoggingOut] = useState(false);
  const [openingRegistry, setOpeningRegistry] = useState(false);

  const accessDeniedHandledRef = useRef("");
  const openingRegistryRef = useRef(false);

  const user = useMemo(() => {
    return authUser || getStoredDashboardUser();
  }, [authUser]);

  const displayName = useMemo(() => getDashboardDisplayName(user), [user]);

  const availableRegistries = useMemo(() => {
    return getAllowedRegistriesFromUser(user);
  }, [user]);

  const accessDenied = Boolean(routeState?.accessDenied);
  const deniedGroupCode = routeState?.deniedGroupCode || "";
  const deniedFrom = routeState?.from || "";

  useEffect(() => {
    if (!accessDenied) {
      return;
    }

    const accessDeniedKey = `${deniedGroupCode}:${deniedFrom}`;

    if (accessDeniedHandledRef.current === accessDeniedKey) {
      return;
    }

    accessDeniedHandledRef.current = accessDeniedKey;

    enqueueSnackbar(getAccessDeniedMessage(deniedGroupCode), {
      variant: "warning",
    });

    navigate(pathname, {
      replace: true,
      state: {},
    });
  }, [
    accessDenied,
    deniedFrom,
    deniedGroupCode,
    enqueueSnackbar,
    navigate,
    pathname,
  ]);

  async function handleLogout() {
    if (loggingOut) return;

    setLoggingOut(true);

    try {
      await logout();
    } finally {
      navigate(routes.login, {
        replace: true,
      });
    }
  }

  function handleViewProfile() {
    navigate(`${routes.profile}?mode=view`);
  }

  function handleUpdateProfile() {
    navigate(`${routes.profile}?mode=edit`);
  }

  async function handleSelectExternalRegistry(route) {
    const cleanRedirectUrl = getCleanRedirectUrl(route);

    if (!cleanRedirectUrl) {
      enqueueSnackbar("No fue posible preparar la ruta del módulo seleccionado.", {
        variant: "warning",
      });
      return;
    }

    const redirectCodeResponse = await createRedirectCodeRequest({
      redirectUrl: cleanRedirectUrl,
    });

    const finalRedirectUrl = buildRedirectCodeUrl({
      redirectUrl: cleanRedirectUrl,
      code: redirectCodeResponse?.code,
    });

    if (!finalRedirectUrl) {
      throw new Error("No se recibió un código temporal de redirección válido.");
    }

    window.location.replace(finalRedirectUrl);
  }

  async function handleSelectRegistry(route) {
    if (openingRegistryRef.current) return;

    if (!route) {
      enqueueSnackbar("No se encontró la ruta del módulo seleccionado.", {
        variant: "warning",
      });
      return;
    }

    if (!isExternalUrl(route)) {
      navigate(route);
      return;
    }

    openingRegistryRef.current = true;
    setOpeningRegistry(true);

    try {
      await handleSelectExternalRegistry(route);
    } catch (error) {
      console.warn("No fue posible abrir el módulo seleccionado:", error);

      enqueueSnackbar("No fue posible abrir el módulo seleccionado.", {
        variant: "error",
      });

      openingRegistryRef.current = false;
      setOpeningRegistry(false);
    }
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        px: { xs: 2, sm: 3, md: 4 },
        py: { xs: 3, sm: 4, md: 5 },
        fontFamily: "Noto Sans, sans-serif",
        background:
          "radial-gradient(circle at 10% 8%, rgba(159,34,65,0.13) 0%, transparent 27%), radial-gradient(circle at 88% 12%, rgba(188,149,92,0.16) 0%, transparent 30%), radial-gradient(circle at 50% 105%, rgba(15,23,42,0.08) 0%, transparent 34%), linear-gradient(135deg, #f8fafc 0%, #f3f4f6 46%, #f7f1e9 100%)",

        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          opacity: 0.32,
          backgroundImage:
            "linear-gradient(rgba(15,23,42,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.04) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
          maskImage:
            "radial-gradient(circle at center, black 0%, transparent 76%)",
          pointerEvents: "none",
        },

        "&::after": {
          content: '""',
          position: "absolute",
          width: 520,
          height: 520,
          right: -260,
          top: 120,
          borderRadius: "50%",
          background:
            "linear-gradient(135deg, rgba(159,34,65,0.10), rgba(188,149,92,0.08))",
          filter: "blur(10px)",
          pointerEvents: "none",
        },

        ...(openingRegistry
          ? {
              pointerEvents: "none",
              opacity: 0.94,
            }
          : {}),
      }}
    >
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "1200px",
          mx: "auto",
        }}
      >
        <DashboardHero
          displayName={displayName}
          registriesCount={availableRegistries.length}
          loggingOut={loggingOut}
          onLogout={handleLogout}
          onViewProfile={handleViewProfile}
          onUpdateProfile={handleUpdateProfile}
        />

        <DashboardModulesPanel
          registries={availableRegistries}
          onSelectRegistry={handleSelectRegistry}
        />
      </Box>
    </Box>
  );
}
