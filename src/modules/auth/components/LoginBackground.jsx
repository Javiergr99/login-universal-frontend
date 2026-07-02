import { Box } from "@mui/material";

import bg from "../../../assets/images/login.webp";

export default function LoginBackground() {
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
            "linear-gradient(90deg, rgba(0,0,0,0.76) 0%, rgba(0,0,0,0.58) 34%, rgba(0,0,0,0.34) 58%, rgba(0,0,0,0.62) 100%)",
          zIndex: -1,
          pointerEvents: "none",
        }}
      />

      <Box
        sx={{
          position: "fixed",
          inset: 0,
          background:
            "radial-gradient(circle at 20% 42%, rgba(159,34,65,0.24) 0%, transparent 34%), radial-gradient(circle at 78% 18%, rgba(188,149,92,0.16) 0%, transparent 28%)",
          zIndex: -1,
          pointerEvents: "none",
        }}
      />
    </>
  );
}