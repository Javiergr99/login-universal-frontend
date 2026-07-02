import PropTypes from "prop-types";
import { Box } from "@mui/material";

export default function PostLoginProgressBar({ durationMs }) {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 390,
        pt: 0.5,
      }}
    >
      <Box
        sx={{
          height: 10,
          width: "100%",
          borderRadius: 999,
          overflow: "hidden",
          position: "relative",
          background: "rgba(15,23,42,0.08)",
          boxShadow: "inset 0 1px 2px rgba(15,23,42,0.08)",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            transformOrigin: "left center",
            borderRadius: 999,
            background: "linear-gradient(90deg, #9f2241 0%, #bc955c 100%)",
            animation: `progressFill ${durationMs}ms cubic-bezier(0.2, 0.8, 0.2, 1) forwards`,

            "&::after": {
              content: '""',
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent)",
              animation: "shimmer 1100ms ease-in-out infinite",
            },
          }}
        />
      </Box>
    </Box>
  );
}

PostLoginProgressBar.propTypes = {
  durationMs: PropTypes.number.isRequired,
};