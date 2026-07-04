import PropTypes from "prop-types";
import { Box } from "@mui/material";

export default function PostLoginProgressBar({ durationMs }) {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 310,
        pt: 0.3,
      }}
    >
      <Box
        sx={{
          height: 4,
          width: "100%",
          borderRadius: 999,
          overflow: "hidden",
          backgroundColor: "rgba(15,23,42,0.08)",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            borderRadius: 999,
            transformOrigin: "left center",
            backgroundColor: "#611232",
            animation: `progressFill ${durationMs}ms cubic-bezier(0.22, 1, 0.36, 1) forwards`,
          }}
        />
      </Box>
    </Box>
  );
}

PostLoginProgressBar.propTypes = {
  durationMs: PropTypes.number.isRequired,
};
