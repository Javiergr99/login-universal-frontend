import { Box, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { interestCards, registryOptions } from "../data/landingData";

import casitaIcon from "../../../assets/icons/CASITA.png";
import planetaIcon from "../../../assets/icons/PLANETA.png";
import manoCorazonIcon from "../../../assets/icons/MANOCORAZON.png";
import personasCorazonIcon from "../../../assets/icons/PERSONAS_CORAZON.png";

const iconMap = {
  casita: casitaIcon,
  planeta: planetaIcon,
  manoCorazon: manoCorazonIcon,
  personasCorazon: personasCorazonIcon,
};

export default function InterestCardsSection() {
  const navigate = useNavigate();

  const handleCardClick = (cardId) => {
    const selected = registryOptions.find((item) => item.key === cardId);

    if (selected) {
      sessionStorage.setItem("selected_registry_key", selected.key);
      sessionStorage.setItem("selected_registry_name", selected.fullName);
      navigate(selected.route);
    }
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        maxWidth: "1240px",
        mx: "auto",
        px: { xs: 2, sm: 3, md: 5, lg: "72px" },
        pt: { xs: 5.5, sm: 6, md: 7.2 },
        pb: { xs: 5.5, sm: 6, md: 7.4 },
      }}
    >
      <Typography
        sx={{
          fontFamily: '"Patria", serif',
          fontSize: { xs: "1.9rem", sm: "2.2rem", md: "1.8rem" },
          lineHeight: 1.05,
          fontWeight: 700,
          color: "#1c1c1c",
          mb: { xs: 2.4, md: 2.9 },
        }}
      >
        Te puede interesar
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
          gap: { xs: 1.8, sm: 2, md: 2.05 },
        }}
      >
        {interestCards.map((card) => (
          <Box
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            sx={{
              backgroundColor: "#ddddddd5",
              borderRadius: { xs: "14px", md: "12px" },
              minHeight: { xs: "auto", lg: 182 },
              px: { xs: 2, sm: 2.3, md: 2.8 },
              py: { xs: 2, sm: 2.2, md: 2.35 },
              cursor: "pointer",
              boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
              transition: "transform 180ms ease, box-shadow 180ms ease",
              "&:hover": {
                transform: { xs: "none", md: "translateY(-3px)" },
                boxShadow: "0 14px 26px rgba(0,0,0,0.10)",
              },
            }}
          >
            <Typography
              sx={{
                fontFamily: '"Patria", serif',
                fontSize: { xs: "1.08rem", sm: "1.18rem", md: "1.3rem" },
                lineHeight: 1.14,
                fontWeight: 700,
                color: card.accent,
                textAlign: "left",
                mb: { xs: 1.35, md: 1.75 },
                maxWidth: { xs: "100%", md: "92%" },
                minHeight: { xs: "auto", md: 56 },
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              {card.title}
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "56px 1fr",
                  sm: "64px 1fr",
                  md: "74px 1fr",
                },
                alignItems: "start",
                columnGap: { xs: 1, sm: 1.2, md: 1.45 },
                minHeight: { xs: "auto", md: 74 },
              }}
            >
              <Box
                sx={{
                  width: { xs: 52, sm: 58, md: 70 },
                  height: { xs: 52, sm: 58, md: 70 },
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mt: { xs: 0.15, md: 0.1 },
                }}
              >
                <Box
                  component="img"
                  src={iconMap[card.iconKey]}
                  alt={card.title}
                  sx={{
                    width: { xs: 48, sm: 54, md: 66 },
                    height: { xs: 48, sm: 54, md: 66 },
                    objectFit: "contain",
                    display: "block",
                    mx: "auto",
                  }}
                />
              </Box>

              <Typography
                sx={{
                  fontFamily: '"Noto Sans", sans-serif',
                  fontSize: { xs: "0.9rem", sm: "0.92rem", md: "0.92rem" },
                  lineHeight: { xs: 1.38, md: 1.3 },
                  fontWeight: 400,
                  color: "#424242",
                  maxWidth: "100%",
                  textAlign: "left",
                  pt: { xs: 0.15, md: 0.3 },
                }}
              >
                {card.description}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Container>
  );
}