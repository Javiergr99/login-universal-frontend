import { Box, Container } from "@mui/material";

import LandingAboutArtwork from "./LandingAboutArtwork";
import LandingAboutContent from "./LandingAboutContent";

export default function LandingAboutSection() {
  return (
    <Container
      maxWidth={false}
      sx={{
        maxWidth: "1240px",
        mx: "auto",
        px: { xs: 2, sm: 3, md: 5, lg: "72px" },
        pt: { xs: 5.5, sm: 6, md: 7.15 },
        pb: { xs: 3, md: 4.1 },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: { xs: 3.2, sm: 4.4, md: 6.5 },
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <LandingAboutContent />
        <LandingAboutArtwork />
      </Box>
    </Container>
  );
}