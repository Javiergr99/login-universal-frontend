import { Box } from "@mui/material";

export default function PostLoginSuccessIcon() {
  return (
    <Box
      sx={{
        width: 104,
        height: 104,
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          background: "rgba(159,34,65,0.10)",
          animation: "ringPulse 1.9s ease-out infinite",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          inset: 9,
          borderRadius: "50%",
          border: "1px solid rgba(188,149,92,0.34)",
          animation: "ringPulse 1.9s ease-out infinite 0.35s",
        }}
      />

      <Box
        sx={{
          width: 74,
          height: 74,
          borderRadius: "26px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #9f2241 0%, #8f1538 44%, #bc955c 100%)",
          boxShadow:
            "0 22px 46px rgba(159,34,65,0.24), inset 0 1px 0 rgba(255,255,255,0.26)",
          animation: "iconLift 520ms ease-out both",
        }}
      >
        <Box
          component="svg"
          viewBox="0 0 52 52"
          sx={{
            width: 40,
            height: 40,
            fill: "none",
          }}
        >
          <Box
            component="path"
            d="M15 27.5L22.5 35L38 17"
            sx={{
              stroke: "#ffffff",
              strokeWidth: 5,
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeDasharray: 60,
              strokeDashoffset: 60,
              animation: "checkDraw 720ms ease-out 220ms forwards",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}