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
          "radial-gradient(circle at 18% 20%, rgba(159,34,65,0.16) 0%, transparent 30%), radial-gradient(circle at 82% 24%, rgba(188,149,92,0.18) 0%, transparent 32%), radial-gradient(circle at 50% 100%, rgba(15,23,42,0.08) 0%, transparent 36%), linear-gradient(135deg, #f8fafc 0%, #eef2f7 48%, #f7f2eb 100%)",

        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          opacity: 0.38,
          backgroundImage:
            "linear-gradient(rgba(15,23,42,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.045) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
          maskImage:
            "radial-gradient(circle at center, black 0%, transparent 72%)",
          pointerEvents: "none",
        },

        "@keyframes cardEnter": {
          "0%": {
            opacity: 0,
            transform: "translateY(22px) scale(0.975)",
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0) scale(1)",
          },
        },

        "@keyframes floatSoft": {
          "0%, 100%": {
            transform: "translate3d(0, 0, 0) scale(1)",
          },
          "50%": {
            transform: "translate3d(18px, -18px, 0) scale(1.06)",
          },
        },

        "@keyframes ringPulse": {
          "0%": {
            transform: "scale(0.72)",
            opacity: 0.4,
          },
          "70%": {
            transform: "scale(1.32)",
            opacity: 0,
          },
          "100%": {
            transform: "scale(1.32)",
            opacity: 0,
          },
        },

        "@keyframes checkDraw": {
          "0%": {
            strokeDashoffset: 60,
            opacity: 0,
          },
          "20%": {
            opacity: 1,
          },
          "100%": {
            strokeDashoffset: 0,
            opacity: 1,
          },
        },

        "@keyframes iconLift": {
          "0%": {
            transform: "translateY(4px) scale(0.92)",
            opacity: 0,
          },
          "100%": {
            transform: "translateY(0) scale(1)",
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

        "@keyframes shimmer": {
          "0%": {
            transform: "translateX(-120%)",
          },
          "100%": {
            transform: "translateX(120%)",
          },
        },

        "@keyframes fadeText": {
          "0%": {
            opacity: 0,
            transform: "translateY(4px)",
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          width: { xs: 240, md: 340 },
          height: { xs: 240, md: 340 },
          borderRadius: "999px",
          top: { xs: -110, md: -90 },
          left: { xs: -120, md: "8%" },
          background:
            "linear-gradient(135deg, rgba(159,34,65,0.22), rgba(188,149,92,0.08))",
          filter: "blur(10px)",
          animation: "floatSoft 6s ease-in-out infinite",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          width: { xs: 310, md: 430 },
          height: { xs: 310, md: 430 },
          borderRadius: "999px",
          right: { xs: -190, md: "3%" },
          bottom: { xs: -210, md: -170 },
          background:
            "linear-gradient(135deg, rgba(188,149,92,0.22), rgba(159,34,65,0.09))",
          filter: "blur(14px)",
          animation: "floatSoft 7s ease-in-out infinite reverse",
        }}
      />

      {children}
    </Box>
  );
}

PostLoginWelcomeShell.propTypes = {
  children: PropTypes.node.isRequired,
};