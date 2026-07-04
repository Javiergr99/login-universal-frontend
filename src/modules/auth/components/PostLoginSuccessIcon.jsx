import { Box } from "@mui/material";

export default function PostLoginSuccessIcon() {
  return (
    <Box
      sx={{
        width: 82,
        height: 82,
        position: "relative",
        display: "grid",
        placeItems: "center",
        animation: "iconEnter 360ms ease-out both",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          border: "1.5px solid rgba(97,18,50,0.10)",
          borderTopColor: "rgba(97,18,50,0.58)",
          animation: "iconRing 1500ms linear infinite",
        }}
      />

      <Box
        sx={{
          width: 58,
          height: 58,
          borderRadius: "20px",
          display: "grid",
          placeItems: "center",
          backgroundColor: "#611232",
          boxShadow: "0 16px 36px rgba(97,18,50,0.18)",
        }}
      >
        <Box
          component="svg"
          viewBox="0 0 52 52"
          sx={{
            width: 33,
            height: 33,
            fill: "none",
          }}
        >
          <Box
            component="path"
            d="M15.5 27.4L22.6 34.5L37.5 18.5"
            sx={{
              stroke: "#ffffff",
              strokeWidth: 5,
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeDasharray: 60,
              strokeDashoffset: 60,
              animation: "checkDraw 620ms ease-out 160ms forwards",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
