import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";

import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

export default function RegistryAccessCard({
  code,
  title,
  subtitle = "",
  description,
  icon,
  canOpen = true,
  onClick,
}) {
  return (
    <Box
      component="button"
      type="button"
      disabled={!canOpen}
      onClick={onClick}
      sx={{
        width: "100%",
        minHeight: { xs: "auto", md: 158 },
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "118px 1fr 56px",
          md: "150px 1fr 72px",
        },
        alignItems: "center",
        gap: { xs: 2, sm: 2.8, md: 3.5 },
        px: { xs: 2.2, sm: 2.8, md: 3.4 },
        py: { xs: 2.5, sm: 2.7, md: 3 },
        borderRadius: "12px",
        border: "1px solid rgba(15,23,42,0.12)",
        backgroundColor: "#ffffff",
        boxShadow:
          "0 12px 30px rgba(15,23,42,0.045), inset 0 1px 0 rgba(255,255,255,0.95)",
        textAlign: "left",
        fontFamily: "Noto Sans, sans-serif",
        cursor: canOpen ? "pointer" : "not-allowed",
        opacity: canOpen ? 1 : 0.58,
        transition:
          "transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease",

        "&:hover": canOpen
          ? {
              transform: "translateY(-2px)",
              borderColor: "rgba(97,18,50,0.28)",
              boxShadow:
                "0 18px 44px rgba(15,23,42,0.075), 0 8px 20px rgba(97,18,50,0.055)",
            }
          : {},

        "&:focus-visible": {
          outline: "3px solid rgba(97,18,50,0.20)",
          outlineOffset: "4px",
        },

        "&:hover .registry-arrow": canOpen
          ? {
              transform: "translateX(5px)",
            }
          : {},

        "&:hover .registry-icon": canOpen
          ? {
              transform: "scale(1.025)",
            }
          : {},
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: { xs: "flex-start", sm: "center" },
          alignItems: "center",
        }}
      >
        <Box
          className="registry-icon"
          sx={{
            width: { xs: 82, sm: 94, md: 104 },
            height: { xs: 82, sm: 94, md: 104 },
            minWidth: { xs: 82, sm: 94, md: 104 },
            borderRadius: "50%",
            background:
              "linear-gradient(135deg, #b21f4b 0%, #9f2241 48%, #6f1230 100%)",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow:
              "0 14px 30px rgba(97,18,50,0.18), inset 0 1px 0 rgba(255,255,255,0.24)",
            transition: "transform 180ms ease",

            "& svg": {
              fontSize: { xs: 38, md: 44 },
            },
          }}
        >
          {icon}
        </Box>
      </Box>

      <Box sx={{ minWidth: 0 }}>
        <Typography
          sx={{
            fontFamily: "Noto Sans, sans-serif",
            fontWeight: 950,
            color: "#7a1235",
            fontSize: { xs: "1.35rem", sm: "1.55rem", md: "1.72rem" },
            lineHeight: 1,
            letterSpacing: "-0.035em",
            mb: 0.75,
          }}
        >
          {code}
        </Typography>

        <Typography
          sx={{
            fontFamily: "Noto Sans, sans-serif",
            fontWeight: 900,
            color: "#1f2937",
            fontSize: { xs: "0.98rem", sm: "1.05rem", md: "1.12rem" },
            lineHeight: 1.34,
            mb: 1.05,
          }}
        >
          {title}
        </Typography>

        {subtitle ? (
          <Typography
            sx={{
              fontFamily: "Noto Sans, sans-serif",
              fontWeight: 800,
              color: "#6b7280",
              fontSize: { xs: "0.82rem", sm: "0.86rem" },
              lineHeight: 1.45,
              mb: 0.75,
            }}
          >
            {subtitle}
          </Typography>
        ) : null}

        <Typography
          sx={{
            fontFamily: "Noto Sans, sans-serif",
            fontWeight: 500,
            color: "#6b7280",
            fontSize: { xs: "0.82rem", sm: "0.88rem" },
            lineHeight: 1.62,
            maxWidth: "860px",
          }}
        >
          {description}
        </Typography>
      </Box>

      <Box
        className="registry-arrow"
        sx={{
          justifySelf: { xs: "flex-start", sm: "center" },
          color: "#611232",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "transform 180ms ease",

          "& svg": {
            fontSize: { xs: 38, sm: 46, md: 52 },
            strokeWidth: 1,
          },
        }}
      >
        <ArrowForwardRoundedIcon />
      </Box>
    </Box>
  );
}

RegistryAccessCard.propTypes = {
  code: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  description: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  canOpen: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};
