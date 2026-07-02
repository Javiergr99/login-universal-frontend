import { Box } from "@mui/material";

import gobLogo from "../../../assets/images/gobmx-logo.png";

export default function GobMxHeaderLogo() {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box
        component="img"
        src={gobLogo}
        alt="Gobierno de México"
        loading="eager"
        sx={{
          height: { xs: 44, sm: 48, md: 56 },
          width: "auto",
          display: "block",
        }}
      />
    </Box>
  );
}

export function GobMxHeaderMobileLogo() {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
      <Box
        component="img"
        src={gobLogo}
        alt="Gobierno de México"
        loading="eager"
        sx={{
          height: 34,
          width: "auto",
          display: "block",
        }}
      />
    </Box>
  );
}