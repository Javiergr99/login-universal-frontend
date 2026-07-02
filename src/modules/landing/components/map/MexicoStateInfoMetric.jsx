import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";

export default function MexicoStateInfoMetric({ label, value }) {
  return (
    <Box>
      <Typography
        sx={{
          fontFamily: '"Noto Sans", sans-serif',
          fontSize: "0.75rem",
          lineHeight: 1.2,
          fontWeight: 800,
          color: "#8a0f3d",
          mb: 0.35,
          textTransform: "uppercase",
          letterSpacing: "0.035em",
        }}
      >
        {label}
      </Typography>

      <Typography
        sx={{
          fontFamily: '"Noto Sans", sans-serif',
          fontSize: "0.94rem",
          fontWeight: 800,
          color: "#3a3a3a",
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}

MexicoStateInfoMetric.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};