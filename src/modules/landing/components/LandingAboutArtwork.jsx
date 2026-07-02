import { Box } from "@mui/material";

import abrazadosImg from "../../../assets/images/NNA_Abrazados.jpg";
import texturaRedImg from "../../../assets/images/Textura_Red.png";

export default function LandingAboutArtwork() {
  return (
    <Box
      sx={{
        width: { xs: "100%", md: "40%" },
        display: "flex",
        justifyContent: { xs: "center", md: "flex-end" },
        pt: { xs: 0.25, md: 0.35 },
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: {
            xs: "min(100%, 320px)",
            sm: 340,
            md: 360,
            lg: 390,
            xl: 410,
          },
          maxWidth: "100%",
          height: {
            xs: 410,
            sm: 450,
            md: 500,
            lg: 540,
            xl: 565,
          },
        }}
      >
        <Box
          component="img"
          src={texturaRedImg}
          alt="Textura decorativa"
          sx={{
            position: "absolute",
            left: { xs: 6, sm: 0, md: -22, lg: -58, xl: -86 },
            bottom: { xs: 0, sm: -4, md: -18, lg: -54, xl: -82 },
            width: { xs: 168, sm: 186, md: 220, lg: 280, xl: 320 },
            height: { xs: 168, sm: 186, md: 220, lg: 280, xl: 320 },
            maxWidth: "100%",
            objectFit: "cover",
            display: "block",
            zIndex: 1,
            borderRadius: "18px",
            "@media (max-width:359px)": {
              width: 154,
              height: 154,
              left: 6,
              bottom: 2,
            },
          }}
        />

        <Box
          component="img"
          src={abrazadosImg}
          alt="Niñas, niños y adolescentes abrazados"
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            zIndex: 2,
            width: { xs: 248, sm: 278, md: 315, lg: 350, xl: 372 },
            height: { xs: 340, sm: 385, md: 460, lg: 505, xl: 535 },
            objectFit: "cover",
            display: "block",
            borderRadius: "18px",
          }}
        />
      </Box>
    </Box>
  );
}