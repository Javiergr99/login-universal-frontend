import { Box, Button, Container, Typography } from "@mui/material";

import logoPorTusDerechos from "../../../assets/logos/Logo_portusderechos.png";
import playeraBlancaImg from "../../../assets/images/NNA_PlayeraBlanca.jpg";
import { heroContent } from "../data/landingData";

export default function LandingHeroSection() {
  return (
    <Box sx={{ backgroundColor: "#ffffff" }}>
      <Container
        maxWidth={false}
        sx={{
          maxWidth: "1240px",
          mx: "auto",
          px: { xs: 2, sm: 3, md: 5, lg: "72px" },
          pt: { xs: 3.25, sm: 4, md: 5.25 },
          pb: { xs: 3, sm: 3.5, md: 4.5 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: { xs: "flex-start", md: "center" },
            justifyContent: "space-between",
            gap: { xs: 3.5, sm: 4, md: 6, lg: 10 },
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Box
            sx={{
              width: { xs: "100%", md: "52%" },
              display: "flex",
              alignItems: "center",
              justifyContent: { xs: "flex-start", md: "flex-start" },
              flexShrink: 0,
            }}
          >
            <Box
              component="img"
              src={logoPorTusDerechos}
              alt="Por tus Derechos"
              sx={{
                width: "100%",
                maxWidth: { xs: 300, sm: 360, md: 470, lg: 500 },
                height: "auto",
                display: "block",
              }}
            />
          </Box>

          <Box
            sx={{
              width: { xs: "100%", md: "36%" },
              maxWidth: { xs: "100%", md: 390 },
              alignSelf: "center",
              flexShrink: 0,
            }}
          >
            <Typography
              sx={{
                fontFamily: '"Noto Sans", sans-serif',
                fontSize: { xs: "0.98rem", sm: "1rem", md: "1rem" },
                fontWeight: 400,
                lineHeight: { xs: 1.68, md: 1.68 },
                color: "#8a2642",
                mb: { xs: 2.1, md: 2.4 },
                maxWidth: 385,
              }}
            >
              {heroContent.description}
            </Typography>

            <Button
              variant="contained"
              disableElevation
              sx={{
                width: { xs: "100%", sm: "auto" },
                maxWidth: { xs: 320, sm: "none" },
                minWidth: { sm: 260, md: 294 },
                height: { xs: 46, md: 44 },
                px: 2.25,
                py: 0,
                textTransform: "none",
                fontFamily: '"Noto Sans", sans-serif',
                fontSize: { xs: "0.94rem", md: "0.96rem" },
                fontWeight: 700,
                lineHeight: 1.15,
                borderRadius: "5px",
                backgroundColor: "#8a0f3d",
                color: "#ffffff",
                border: "1.5px solid #6f1235",
                boxSizing: "border-box",
                justifyContent: "center",
                textAlign: "center",
                "&:hover": {
                  backgroundColor: "#740c33",
                },
              }}
            >
              {heroContent.buttonText}
            </Button>
          </Box>
        </Box>
      </Container>

      <Box
        component="img"
        src={playeraBlancaImg}
        alt="Niñas, niños y adolescentes"
        sx={{
          width: "100%",
          height: { xs: 210, sm: 280, md: 364, lg: 390 },
          objectFit: "cover",
          objectPosition: "center center",
          display: "block",
        }}
      />
    </Box>
  );
}