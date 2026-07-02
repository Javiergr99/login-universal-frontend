import { Box, Typography } from "@mui/material";

export default function MexicoMapInstructionBadge() {
  return (
    <Box
      sx={{
        position: "absolute",
        top: { xs: 12, md: 16 },
        left: { xs: 12, md: 16 },
        zIndex: 2,
        px: 1.2,
        py: 0.55,
        borderRadius: "999px",
        backgroundColor: "rgba(255,255,255,0.84)",
        border: "1px solid rgba(138,15,61,0.12)",
        backdropFilter: "blur(10px)",
      }}
    >
      <Typography
        sx={{
          fontFamily: '"Noto Sans", sans-serif',
          fontSize: { xs: "0.72rem", md: "0.76rem" },
          lineHeight: 1.2,
          fontWeight: 800,
          color: "#8a0f3d",
        }}
      >
        Haz clic en una entidad
      </Typography>
    </Box>
  );
}