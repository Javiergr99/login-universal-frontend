import { Box, Typography } from "@mui/material";

import { statsInitial } from "../data/landingData";

export default function LandingStatsGrid() {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "repeat(2, minmax(0, 1fr))",
          md: "repeat(4, minmax(0, 1fr))",
        },
        columnGap: { xs: 1.4, sm: 2, md: 3.2 },
        rowGap: { xs: 2.2, md: 0 },
        alignItems: "start",
        mb: { xs: 3.5, md: 4.2 },
        "@media (max-width:359px)": {
          columnGap: 1.1,
          rowGap: 2,
        },
      }}
    >
      {statsInitial.map((item) => (
        <Box
          key={item.id}
          sx={{
            minHeight: { xs: "auto", md: 116 },
            pr: { xs: 0.5, md: 0 },
          }}
        >
          <Typography
            sx={{
              fontFamily: '"Patria", serif',
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3.5rem" },
              lineHeight: 0.98,
              fontWeight: 700,
              color: "#c0184f",
              mb: 0.55,
              letterSpacing: "-0.01em",
              "@media (max-width:359px)": {
                fontSize: "1.85rem",
              },
            }}
          >
            {item.value.toLocaleString("es-MX")}
            {item.suffix}
          </Typography>

          <Typography
            sx={{
              fontFamily: '"Noto Sans", sans-serif',
              fontSize: { xs: "0.82rem", sm: "0.9rem", md: "0.94rem" },
              lineHeight: 1.2,
              fontWeight: 700,
              color: "#2f2f2f",
              maxWidth: { xs: "100%", md: 165 },
              "@media (max-width:359px)": {
                fontSize: "0.78rem",
              },
            }}
          >
            {item.label}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}