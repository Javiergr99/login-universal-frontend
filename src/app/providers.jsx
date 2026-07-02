import PropTypes from "prop-types";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { SnackbarProvider } from "notistack";

import theme from "./theme";
import { AuthProvider } from "../context/AuthContext";

/**
 * Proveedores globales de la app.
 * @param {{ children: import("react").ReactNode }} props
 * @returns {JSX.Element}
 */
export default function AppProviders({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={3500}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        preventDuplicate
      >
        <AuthProvider>{children}</AuthProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

AppProviders.propTypes = {
  children: PropTypes.node.isRequired,
};