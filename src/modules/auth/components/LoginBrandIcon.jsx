import PropTypes from "prop-types";
import { Box } from "@mui/material";

import loginIcon from "../../../assets/icons/login-icon.webp";

export default function LoginBrandIcon({
  alt = "Registro de Medidas de Protección",
}) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 1,
        mb: 1.5,
      }}
    >
      <Box
        sx={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transition: "transform 280ms ease",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            width: 90,
            height: 90,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,255,255,0.24) 0%, rgba(255,255,255,0.10) 40%, rgba(255,255,255,0) 70%)",
            filter: "blur(8px)",
            zIndex: 0,
          }}
        />

        <Box
          component="img"
          src={loginIcon}
          alt={alt}
          sx={{
            width: 58,
            height: "auto",
            position: "relative",
            zIndex: 1,
            filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.28))",
          }}
        />
      </Box>
    </Box>
  );
}

LoginBrandIcon.propTypes = {
  alt: PropTypes.string,
};