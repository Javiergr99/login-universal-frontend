import { Suspense, lazy } from "react";
import { Box, Container, Typography } from "@mui/material";

import LandingStatsGrid from "./LandingStatsGrid";
import MapLoadingFallback from "./MapLoadingFallback";

const MexicoInteractiveMap = lazy(() => import("./MexicoInteractiveMap"));

export default function LandingProtectionSection() {
  return (
    <Container
      maxWidth={false}
      sx={{
        maxWidth: "1240px",
        mx: "auto",
        px: { xs: 2, sm: 3, md: 5, lg: "72px" },
        pt: { xs: 5.5, md: 6.2 },
        pb: { xs: 3, md: 3.2 },
      }}
    >
      <Typography
        sx={{
          fontFamily: '"Patria", serif',
          fontSize: { xs: "1.95rem", sm: "2.35rem", md: "3rem" },
          lineHeight: { xs: 1.05, md: 1.04 },
          fontWeight: 700,
          color: "#1d1d1d",
          mb: 1.15,
          letterSpacing: "-0.01em",
        }}
      >
        Protección en Todo México
      </Typography>

      <Typography
        sx={{
          fontFamily: '"Noto Sans", sans-serif',
          fontSize: { xs: "0.95rem", md: "0.92rem" },
          lineHeight: 1.6,
          fontWeight: 400,
          color: "#5f5f5f",
          maxWidth: 615,
          mb: { xs: 3, md: 3.6 },
        }}
      >
        Explora dónde están activas las procuradurías de protección en todo el
        país. Haz clic en cada estado para ver cuántas procuradurías están
        operando, su estado y cuándo se actualizó la información por última vez.
      </Typography>

      <LandingStatsGrid />

      <Box
        sx={{
          width: "100%",
          overflow: "hidden",
          borderRadius: { xs: "16px", md: "20px" },
        }}
      >
        <Suspense fallback={<MapLoadingFallback />}>
          <MexicoInteractiveMap />
        </Suspense>
      </Box>
    </Container>
  );
}