import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";

export default function PostLoginLoadingBadge({ message }) {
  return (
    <Box
      sx={{
        px: 2,
        py: 0.9,
        borderRadius: 999,
        background: "rgba(159,34,65,0.08)",
        border: "1px solid rgba(159,34,65,0.10)",
      }}
    >
      <Typography
        key={message}
        sx={{
          fontFamily: "'Noto Sans', sans-serif",
          color: "#8f1538",
          fontSize: "0.88rem",
          fontWeight: 800,
          animation: "fadeText 240ms ease-out both",
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