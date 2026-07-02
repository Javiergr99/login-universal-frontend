import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

export default function RegistryAccessCard({
  code,
  title,
  subtitle = "",
  description,
  icon,
  index = 1,
  onClick,
}) {
  return (
    <Box
      component="button"
      type="button"
      onClick={onClick}
      sx={{
        width: "100%",
        position: "relative",
        overflow: "hidden",
        border: "1px solid rgba(15,23,42,0.085)",
        borderRadius: { xs: "22px", sm: "24px" },
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.94) 58%, rgba(255,248,250,0.90) 100%)",
        px: { xs: 2.2, sm: 2.8, md: 3.2 },
        py: { xs: 2.45, sm: 2.75 },
        textAlign: "left",
        cursor: "pointer",
        transition:
          "transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease, background 220ms ease",
        boxShadow:
          "0 10px 28px rgba(15,23,42,0.035), inset 0 1px 0 rgba(255,255,255,0.92)",
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "94px 1fr 58px",
          md: "104px 1fr 68px",
        },
        gap: { xs: 1.9, sm: 2.5, md: 3 },
        alignItems: "center",
        fontFamily: "Noto Sans, sans-serif",

        "&::before": {
          content: '""',
          position: "absolute",
          left: 0,
          top: 18,
          bottom: 18,
          width: "5px",
          borderRadius: "0 999px 999px 0",
          background: "linear-gradient(180deg, #9f2241 0%, #bc955c 100%)",
          opacity: 0,
          transition: "opacity 220ms ease",
        },

        "&::after": {
          content: '""',
          position: "absolute",
          width: 210,
          height: 210,
          right: -120,
          top: -110,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(159,34,65,0.10) 0%, transparent 65%)",
          opacity: 0,
          transition: "opacity 220ms ease",
          pointerEvents: "none",
        },

        "&:hover": {
          borderColor: "rgba(159,34,65,0.34)",
          transform: "translateY(-3px)",
          boxShadow:
            "0 20px 46px rgba(15,23,42,0.08), 0 10px 24px rgba(159,34,65,0.08), inset 0 1px 0 rgba(255,255,255,0.95)",
          background:
            "linear-gradient(135deg, #ffffff 0%, rgba(255,251,252,0.98) 100%)",
        },

        "&:hover::before": {
          opacity: 1,
        },

        "&:hover::after": {
          opacity: 1,
        },

        "&:focus-visible": {
          outline: "3px solid rgba(159,34,65,0.22)",
          outlineOffset: "3px",
        },

        "&:hover .registry-icon": {
          transform: "scale(1.065) rotate(-2deg)",
          boxShadow:
            "0 20px 38px rgba(159,34,65,0.25), inset 0 1px 0 rgba(255,255,255,0.34)",
        },

        "&:hover .registry-arrow": {
          transform: "translateX(5px)",
          color: "#ffffff",
          backgroundColor: "#8f1538",
          borderColor: "#8f1538",
        },

        "&:hover .registry-index": {
          opacity: 1,
          transform: "translateY(0)",
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          display: "flex",
          justifyContent: { xs: "center", sm: "flex-start" },
          alignItems: "center",
        }}
      >
        <Box
          className="registry-index"
          sx={{
            position: "absolute",
            top: { xs: -8, sm: -10 },
            left: { xs: "calc(50% + 18px)", sm: 52 },
            width: 28,
            height: 28,
            borderRadius: "50%",
            backgroundColor: "#ffffff",
            border: "1px solid rgba(159,34,65,0.14)",
            color: "#8f1538",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "Noto Sans, sans-serif",
            fontWeight: 950,
            fontSize: "0.72rem",
            boxShadow: "0 8px 18px rgba(15,23,42,0.08)",
            opacity: { xs: 1, sm: 0.72 },
            transform: { xs: "translateY(0)", sm: "translateY(2px)" },
            transition: "opacity 220ms ease, transform 220ms ease",
            zIndex: 2,
          }}
        >
          {String(index).padStart(2, "0")}
        </Box>

        <Box
          className="registry-icon"
          sx={{
            width: { xs: 82, sm: 78, md: 84 },
            height: { xs: 82, sm: 78, md: 84 },
            minWidth: { xs: 82, sm: 78, md: 84 },
            borderRadius: "50%",
            background:
              "linear-gradient(135deg, #c40b48 0%, #9f2241 50%, #75102f 100%)",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow:
              "0 14px 28px rgba(159,34,65,0.18), inset 0 1px 0 rgba(255,255,255,0.30)",
            transition: "transform 220ms ease, box-shadow 220ms ease",
            position: "relative",
            overflow: "hidden",

            "&::before": {
              content: '""',
              position: "absolute",
              inset: 8,
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.22)",
            },

            "&::after": {
              content: '""',
              position: "absolute",
              width: 50,
              height: 90,
              top: -26,
              left: -22,
              transform: "rotate(28deg)",
              background: "rgba(255,255,255,0.18)",
            },

            "& svg": {
              position: "relative",
              zIndex: 1,
            },
          }}
        >
          {icon}
        </Box>
      </Box>

      <Box sx={{ minWidth: 0 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: { xs: "center", sm: "flex-start" },
            flexDirection: "column",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Noto Sans, sans-serif",
              fontWeight: 950,
              fontSize: { xs: "1.04rem", sm: "1.08rem" },
              color: "#8f1538",
              lineHeight: 1.05,
              mb: 0.35,
              letterSpacing: "0.015em",
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            {code}
          </Typography>

          <Typography
            sx={{
              fontFamily: "Noto Sans, sans-serif",
              fontWeight: 950,
              fontSize: {
                xs: "0.96rem",
                sm: "1.02rem",
                md: "1.06rem",
              },
              color: "#1f2937",
              lineHeight: 1.34,
              mb: 0.78,
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            {title}
          </Typography>

          {subtitle ? (
            <Typography
              sx={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "Noto Sans, sans-serif",
                fontWeight: 900,
                fontSize: "0.74rem",
                color: "#72522b",
                backgroundColor: "rgba(188,149,92,0.12)",
                border: "1px solid rgba(188,149,92,0.16)",
                borderRadius: 999,
                px: 1.2,
                py: 0.35,
                mb: 0.95,
              }}
            >
              {subtitle}
            </Typography>
          ) : null}
        </Box>

        <Typography
          sx={{
            fontFamily: "Noto Sans, sans-serif",
            fontWeight: 500,
            fontSize: { xs: "0.82rem", sm: "0.85rem" },
            color: "#64748b",
            lineHeight: 1.58,
            maxWidth: "820px",
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          {description}
        </Typography>
      </Box>

      <Box
        className="registry-arrow"
        sx={{
          width: { xs: 46, sm: 52 },
          height: { xs: 46, sm: 52 },
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          justifySelf: { xs: "center", sm: "end" },
          color: "#8f1538",
          backgroundColor: "rgba(159,34,65,0.055)",
          border: "1px solid rgba(159,34,65,0.10)",
          transition:
            "transform 220ms ease, color 220ms ease, background-color 220ms ease, border-color 220ms ease",
        }}
      >
        <ArrowForwardRoundedIcon sx={{ fontSize: { xs: 30, sm: 34 } }} />
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
  index: PropTypes.number,
  onClick: PropTypes.func.isRequired,
};
