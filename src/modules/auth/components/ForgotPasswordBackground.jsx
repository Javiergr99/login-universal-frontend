import { Box } from "@mui/material";

import bg from "../../../assets/images/login.webp";

export default function ForgotPasswordBackground() {
  return (
    <>
      <Box
        sx={{
          position: "fixed",
          inset: 0,
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: -1,
          pointerEvents: "none",
        }}
      />

      <Box
        sx={{
          position: "fixed",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.28) 45%, rgba(0,0,0,0.52) 100%)",
          zIndex: -1,
          pointerEvents: "none",
        }}
      />
    </>
  );
}