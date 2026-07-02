import PropTypes from "prop-types";
import { Box, LinearProgress, Stack, Typography } from "@mui/material";

import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import RadioButtonUncheckedRoundedIcon from "@mui/icons-material/RadioButtonUncheckedRounded";

const STRENGTH_STYLES = {
  empty: {
    color: "#64748b",
    background: "rgba(100,116,139,0.14)",
    progress: 0,
  },
  weak: {
    color: "#b42318",
    background: "rgba(180,35,24,0.14)",
    progress: 30,
  },
  medium: {
    color: "#b45309",
    background: "rgba(180,83,9,0.16)",
    progress: 65,
  },
  strong: {
    color: "#047857",
    background: "rgba(4,120,87,0.16)",
    progress: 100,
  },
};

export default function PasswordStrengthMeter({ strength }) {
  const styles = STRENGTH_STYLES[strength.level] || STRENGTH_STYLES.empty;

  return (
    <Box
      sx={{
        gridColumn: { xs: "1", sm: "1 / -1" },
        borderRadius: "18px",
        border: "1px solid rgba(15,23,42,0.08)",
        backgroundColor: "rgba(255,255,255,0.72)",
        p: 2,
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        spacing={1}
        sx={{ mb: 1.2 }}
      >
        <Box>
          <Typography
            sx={{
              fontFamily: "Noto Sans, sans-serif",
              color: "#1f2937",
              fontWeight: 950,
              fontSize: "0.92rem",
            }}
          >
            Seguridad de la contraseña
          </Typography>

          <Typography
            sx={{
              fontFamily: "Noto Sans, sans-serif",
              color: "#64748b",
              fontSize: "0.8rem",
              mt: 0.25,
            }}
          >
            {strength.helperText}
          </Typography>
        </Box>

        <Box
          sx={{
            px: 1.35,
            py: 0.5,
            borderRadius: 999,
            color: styles.color,
            backgroundColor: styles.background,
            fontFamily: "Noto Sans, sans-serif",
            fontWeight: 950,
            fontSize: "0.76rem",
          }}
        >
          {strength.label}
        </Box>
      </Stack>

      <LinearProgress
        variant="determinate"
        value={styles.progress}
        sx={{
          height: 8,
          borderRadius: 999,
          backgroundColor: "rgba(100,116,139,0.14)",
          mb: 1.5,
          "& .MuiLinearProgress-bar": {
            borderRadius: 999,
            backgroundColor: styles.color,
          },
        }}
      />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, minmax(0, 1fr))",
          },
          gap: 1,
        }}
      >
        {strength.requirements.map((requirement) => (
          <Stack
            key={requirement.key}
            direction="row"
            alignItems="center"
            spacing={0.8}
          >
            {requirement.isValid ? (
              <CheckCircleRoundedIcon
                sx={{
                  fontSize: 18,
                  color: "#047857",
                }}
              />
            ) : (
              <RadioButtonUncheckedRoundedIcon
                sx={{
                  fontSize: 18,
                  color: "#94a3b8",
                }}
              />
            )}

            <Typography
              sx={{
                fontFamily: "Noto Sans, sans-serif",
                color: requirement.isValid ? "#047857" : "#64748b",
                fontSize: "0.8rem",
                fontWeight: requirement.isValid ? 850 : 650,
              }}
            >
              {requirement.label}
            </Typography>
          </Stack>
        ))}
      </Box>
    </Box>
  );
}

PasswordStrengthMeter.propTypes = {
  strength: PropTypes.shape({
    level: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    helperText: PropTypes.string.isRequired,
    requirements: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        isValid: PropTypes.bool.isRequired,
      })
    ).isRequired,
  }).isRequired,
};