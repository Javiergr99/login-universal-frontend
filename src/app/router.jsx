import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/material";

import routes from "./routes";
import ProtectedRoute from "./guards/ProtectedRoute";
import PublicRoute from "./guards/PublicRoute";
import PendingTwoFactorRoute from "./guards/PendingTwoFactorRoute";

const HomePage = lazy(() => import("../modules/landing/pages/HomePage"));

const LoginPage = lazy(() => import("../modules/auth/pages/LoginPage"));

const ForgotPasswordPage = lazy(() =>
  import("../modules/auth/pages/ForgotPasswordPage")
);

const TwoFactorPage = lazy(() =>
  import("../modules/auth/pages/TwoFactorPage")
);

const DashboardPage = lazy(() =>
  import("../modules/dashboard/pages/DashboardPage")
);

const PostLoginWelcomePage = lazy(() =>
  import("../modules/auth/pages/PostLoginWelcomePage")
);

const ProfilePage = lazy(() => import("../modules/profile/pages/ProfilePage"));

function RouteLoadingFallback() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        background:
          "linear-gradient(135deg, #f8fafc 0%, #f3f4f6 46%, #f7f1e9 100%)",
        fontFamily: "Noto Sans, sans-serif",
      }}
    >
      <CircularProgress
        size={42}
        thickness={4.2}
        sx={{
          color: "#8f1538",
        }}
      />

      <Typography
        sx={{
          fontFamily: "Noto Sans, sans-serif",
          fontWeight: 800,
          color: "#8f1538",
          fontSize: "0.95rem",
        }}
      >
        Cargando módulo…
      </Typography>
    </Box>
  );
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<RouteLoadingFallback />}>
        <Routes>
          <Route path={routes.root} element={<HomePage />} />

          <Route element={<PublicRoute />}>
            <Route path={routes.login} element={<LoginPage />} />

            <Route
              path={routes.forgotPassword}
              element={<ForgotPasswordPage />}
            />
          </Route>

          <Route element={<PendingTwoFactorRoute />}>
            <Route path={routes.twoFactor} element={<TwoFactorPage />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route
              path={routes.postLoginWelcome}
              element={<PostLoginWelcomePage />}
            />

            <Route path={routes.dashboard} element={<DashboardPage />} />

            <Route path={routes.profile} element={<ProfilePage />} />
          </Route>

          <Route path="*" element={<Navigate to={routes.root} replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}