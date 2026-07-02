import { Box, Typography } from "@mui/material";

import { aboutParagraphs, faqItems } from "../data/landingData";

export default function LandingAboutContent() {
  return (
    <Box
      sx={{
        width: { xs: "100%", md: "54%" },
        maxWidth: { xs: "100%", md: 470 },
      }}
    >
      <Typography
        sx={{
          fontFamily: '"Patria", serif',
          fontSize: { xs: "1.78rem", sm: "2.35rem", md: "3.14rem" },
          lineHeight: { xs: 1.02, md: 1.01 },
          fontWeight: 700,
          color: "#181818",
          mb: { xs: 1.8, md: 2.25 },
          letterSpacing: "-0.01em",
          textRendering: "geometricPrecision",
          "@media (max-width:359px)": {
            fontSize: "1.62rem",
            lineHeight: 1.01,
          },
        }}
      >
        ¿Qué es “Por tus Derechos”?
      </Typography>

      {aboutParagraphs.map((paragraph, index) => (
        <Typography
          key={paragraph}
          sx={{
            fontFamily: '"Noto Sans", sans-serif',
            fontSize: { xs: "0.95rem", md: "0.92rem" },
            lineHeight: { xs: 1.68, md: 1.6 },
            fontWeight: 400,
            color: "#6b6b6b",
            mb: index === aboutParagraphs.length - 1 ? 2.3 : 1.7,
            maxWidth: 458,
          }}
        >
          {paragraph}
        </Typography>
      ))}

      <Typography
        sx={{
          fontFamily: '"Noto Sans", sans-serif',
          fontSize: { xs: "1rem", md: "1rem" },
          fontWeight: 800,
          color: "#242424",
          mb: 1.5,
        }}
      >
        Preguntas Frecuentes:
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1.05,
          maxWidth: 468,
        }}
      >
        {faqItems.map((item) => (
          <Box key={item.id}>
            <Typography
              sx={{
                fontFamily: '"Noto Sans", sans-serif',
                fontSize: { xs: "0.92rem", md: "0.92rem" },
                fontWeight: 800,
                lineHeight: 1.4,
                color: "#8a1a42",
                mb: 0.28,
              }}
            >
              {item.displayNumber} {item.question}
            </Typography>

            <Typography
              sx={{
                fontFamily: '"Noto Sans", sans-serif',
                fontSize: { xs: "0.86rem", md: "0.86rem" },
                lineHeight: 1.52,
                fontWeight: 400,
                color: "#707070",
                maxWidth: 462,
              }}
            >
              {item.answer}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}