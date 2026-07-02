import { Box, Container } from "@mui/material";

import mapaGeooBanner from "../../../assets/logos/Mapageoo.png";

export default function GeoBannerSection() {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#d7cfb3",
        py: { xs: 2.5, sm: 3, md: 0 },
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          maxWidth: "1240px",
          mx: "auto",
          px: { xs: 2, sm: 3, md: 0 },
        }}
      >
        <Box
          component="a"
          href="https://portusderechos.dif.gob.mx/mapas/"
          target="_blank"
          rel="noreferrer"
          aria-label="Ir al mapa de georreferencia"
          sx={{
            display: "block",
            width: "100%",
            textDecoration: "none",
            cursor: "pointer",
            lineHeight: 0,
            overflow: "hidden",
            borderRadius: { xs: "16px", sm: "18px", md: 0 },
            boxShadow: {
              xs: "0 6px 18px rgba(0,0,0,0.08)",
              md: "none",
            },
            transition: "transform 180ms ease",
            "&:hover": {
              transform: { xs: "none", md: "translateY(-2px)" },
            },
          }}
        >
          <Box
            component="img"
            src={mapaGeooBanner}
            alt="Mapa de georreferencia de Procuradurías de Protección de Niñas, Niños y Adolescentes"
            sx={{
              width: "100%",
              height: "auto",
              display: "block",
            }}
          />
        </Box>
      </Container>
    </Box>
  );
}