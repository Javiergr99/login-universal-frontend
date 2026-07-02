import PropTypes from "prop-types";
import { Box, Button, Stack, Typography } from "@mui/material";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";

export default function ProfilePageHeader({ onBack }) {
  return (
    <>
      <Button
        startIcon={<ArrowBackRoundedIcon />}
        onClick={onBack}
        sx={{
          mb: 2,
          textTransform: "none",
          fontWeight: 900,
          color: "#8f1538",
          borderRadius: 999,
        }}
      >
        Volver al dashboard
      </Button>

      <Box
        sx={{
          p: { xs: 3, sm: 4 },
          background:
            "linear-gradient(135deg, rgba(159,34,65,0.10), rgba(188,149,92,0.08))",
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <BadgeRoundedIcon sx={{ color: "#8f1538" }} />

          <Typography
            component="h1"
            sx={{
              fontWeight: 950,
              color: "#111827",
              fontSize: { xs: "1.65rem", sm: "2rem" },
              letterSpacing: "-0.04em",
            }}
          >
            Perfil de usuario
          </Typography>
        </Stack>

        <Typography
          sx={{
            mt: 1,
            color: "#64748b",
            lineHeight: 1.6,
            fontSize: "0.95rem",
          }}
        >
          Consulta o actualiza la información de tu cuenta institucional.
        </Typography>
      </Box>
    </>
  );
}

ProfilePageHeader.propTypes = {
  onBack: PropTypes.func.isRequired,
};