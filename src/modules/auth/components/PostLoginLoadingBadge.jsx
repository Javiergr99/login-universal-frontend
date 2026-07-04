import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";

export default function PostLoginLoadingBadge({ message }) {
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
        px: 1.8,
        py: 0.85,
        borderRadius: 999,
        backgroundColor: "rgba(97,18,50,0.045)",
        border: "1px solid rgba(97,18,50,0.08)",
      }}
    >
      <Box
        sx={{
          width: 7,
          height: 7,
          borderRadius: "50%",
          backgroundColor: "#611232",
          animation: "statusPulse 1100ms ease-in-out infinite",
        }}
      />

      <Typography
        key={message}
        sx={{
          fontFamily: "'Noto Sans', sans-serif",
          color: "#611232",
          fontSize: "0.86rem",
          fontWeight: 800,
          animation: "fadeText 220ms ease-out both",
        }}
      >
        {message}
      </Typography>
    </Box>
  );
}

PostLoginLoadingBadge.propTypes = {
  message: PropTypes.string.isRequired,
};
