import PropTypes from "prop-types";
import { Box } from "@mui/material";

export default function PostLoginWelcomeShell({ children }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: { xs: 2, sm: 3 },
        py: 4,
        fontFamily: "'Noto Sans', sans-serif",
        background:
          "linear-gradient(135deg, #f8fafc 0%, #f5f3ef 52%, #f8fafc 100%)",

        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(circle at 50% 34%, rgba(97,18,50,0.055), transparent 34%)",
        },

        "@keyframes cardEnter": {
          "0%": {
            opacity: 0,
            transform: "translateY(12px) scale(0.985)",
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0) scale(1)",
          },
        },

        "@keyframes iconEnter": {
          "0%": {
            opacity: 0,
            transform: "scale(0.92)",
          },
          "100%": {
            opacity: 1,
            transform: "scale(1)",
          },
        },

        "@keyframes iconRing": {
          "0%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },

        "@keyframes checkDraw": {
          "0%": {
            strokeDashoffset: 60,
            opacity: 0,
          },
          "18%": {
            opacity: 1,
          },
          "100%": {
            strokeDashoffset: 0,
            opacity: 1,
          },
        },

        "@keyframes progressFill": {
          "0%": {
            transform: "scaleX(0)",
          },
          "100%": {
            transform: "scaleX(1)",
          },
        },

        "@keyframes fadeText": {
          "0%": {
            opacity: 0,
            transform: "translateY(3px)",
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0)",
          },
        },

        "@keyframes statusPulse": {
          "0%, 100%": {
            opacity: 0.42,
            transform: "scale(1)",
          },
          "50%": {
            opacity: 1,
            transform: "scale(1.12)",
          },
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: { xs: 22, sm: 36 },
          left: "50%",
          width: { xs: 180, sm: 240 },
          height: { xs: 180, sm: 240 },
          borderRadius: "50%",
          transform: "translateX(-50%)",
          background:
            "linear-gradient(180deg, rgba(97,18,50,0.08), rgba(188,149,92,0.05))",
          filter: "blur(28px)",
          pointerEvents: "none",
        }}
      />

      {children}
    </Box>
  );
}

PostLoginWelcomeShell.propTypes = {
  children: PropTypes.node.isRequired,
};
