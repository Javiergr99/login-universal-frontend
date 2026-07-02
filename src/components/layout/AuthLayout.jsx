import PropTypes from "prop-types";
import { Box } from "@mui/material";
import GobMxHeader from "./GobMxHeader";
import GobMxFooter from "./GobMxFooter";

export default function AuthLayout({ children }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        isolation: "isolate",
        background: "transparent",
      }}
    >
      <Box sx={{ position: "relative", zIndex: 3 }}>
        <GobMxHeader />
      </Box>

      <Box
        component="main"
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: { xs: 2, sm: 3, md: 4 },
          py: { xs: 4, md: 6 },
          position: "relative",
          zIndex: 2,
        }}
      >
        {children}
      </Box>

      <Box sx={{ position: "relative", zIndex: 3 }}>
        <GobMxFooter />
      </Box>
    </Box>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
};