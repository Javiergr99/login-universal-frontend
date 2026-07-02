import PropTypes from "prop-types";
import { Box, Button, Stack, Typography } from "@mui/material";

import EditRoundedIcon from "@mui/icons-material/EditRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";

export default function ProfileUserSummary({
  fullName,
  email,
  isEditMode,
  onViewMode,
  onEditMode,
}) {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      justifyContent="space-between"
      alignItems={{ xs: "flex-start", sm: "center" }}
      spacing={2}
      sx={{ mb: 3 }}
    >
      <Box>
        <Typography
          sx={{
            fontWeight: 950,
            color: "#1f2937",
            fontSize: "1.2rem",
          }}
        >
          {fullName}
        </Typography>

        <Typography
          sx={{
            color: "#64748b",
            fontSize: "0.9rem",
            mt: 0.3,
          }}
        >
          {email || "Correo no registrado"}
        </Typography>
      </Box>

      <Stack direction="row" spacing={1}>
        <Button
          startIcon={<VisibilityRoundedIcon />}
          onClick={onViewMode}
          variant={!isEditMode ? "contained" : "outlined"}
          sx={{
            textTransform: "none",
            borderRadius: 999,
            fontWeight: 900,
            bgcolor: !isEditMode ? "#8f1538" : "transparent",
            borderColor: "rgba(159,34,65,0.30)",
            color: !isEditMode ? "#ffffff" : "#8f1538",
            "&:hover": {
              bgcolor: !isEditMode ? "#7a1230" : "rgba(159,34,65,0.06)",
              borderColor: "#8f1538",
            },
          }}
        >
          Ver
        </Button>

        <Button
          startIcon={<EditRoundedIcon />}
          onClick={onEditMode}
          variant={isEditMode ? "contained" : "outlined"}
          sx={{
            textTransform: "none",
            borderRadius: 999,
            fontWeight: 900,
            bgcolor: isEditMode ? "#8f1538" : "transparent",
            borderColor: "rgba(159,34,65,0.30)",
            color: isEditMode ? "#ffffff" : "#8f1538",
            "&:hover": {
              bgcolor: isEditMode ? "#7a1230" : "rgba(159,34,65,0.06)",
              borderColor: "#8f1538",
            },
          }}
        >
          Actualizar datos
        </Button>
      </Stack>
    </Stack>
  );
}

ProfileUserSummary.propTypes = {
  fullName: PropTypes.string.isRequired,
  email: PropTypes.string,
  isEditMode: PropTypes.bool.isRequired,
  onViewMode: PropTypes.func.isRequired,
  onEditMode: PropTypes.func.isRequired,
};