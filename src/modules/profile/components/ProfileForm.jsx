import PropTypes from "prop-types";
import { Box, Button, Stack } from "@mui/material";

import SaveRoundedIcon from "@mui/icons-material/SaveRounded";

import PasswordStrengthMeter from "./PasswordStrengthMeter";
import ProfileField from "./ProfileField";
import ProfilePasswordField from "./ProfilePasswordField";

export default function ProfileForm({
  form,
  loading,
  isEditMode,
  passwordStrength,
  passwordSubmitState,
  onFieldChange,
  onSubmit,
  onCancel,
}) {
  return (
    <Box component="form" onSubmit={onSubmit}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, minmax(0, 1fr))",
          },
          gap: 2,
        }}
      >
        <ProfileField
          label="Nombre"
          name="nombre"
          value={form.nombre}
          onChange={onFieldChange}
          disabled={!isEditMode}
        />

        <ProfileField
          label="Primer apellido"
          name="primer_apellido"
          value={form.primer_apellido}
          onChange={onFieldChange}
          disabled={!isEditMode}
        />

        <ProfileField
          label="Segundo apellido"
          name="segundo_apellido"
          value={form.segundo_apellido}
          onChange={onFieldChange}
          disabled={!isEditMode}
        />

        <ProfileField
          label="Correo electrónico"
          name="correo_electronico"
          value={form.correo_electronico}
          onChange={onFieldChange}
          disabled={!isEditMode}
        />

        <ProfileField
          label="CURP"
          name="curp"
          value={form.curp}
          onChange={onFieldChange}
          disabled={!isEditMode}
          inputProps={{ maxLength: 18 }}
        />

        <ProfileField
          label="Entidad federativa ID"
          name="entidad_federativa_id"
          value={String(form.entidad_federativa_id || "")}
          onChange={onFieldChange}
          disabled={!isEditMode}
        />

        <ProfileField
          label="Teléfono"
          name="numero_telefono"
          value={form.numero_telefono}
          onChange={onFieldChange}
          disabled={!isEditMode}
        />

        {isEditMode ? (
          <>
            <ProfilePasswordField
              label="Nueva contraseña"
              name="password"
              value={form.password}
              onChange={onFieldChange}
              disabled={loading}
            />

            <ProfilePasswordField
              label="Confirmar contraseña"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={onFieldChange}
              disabled={loading}
            />

            <PasswordStrengthMeter strength={passwordStrength} />
          </>
        ) : null}
      </Box>

      {isEditMode ? (
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="flex-end"
          spacing={1.2}
          sx={{ mt: 3 }}
        >
          <Button
            type="button"
            variant="outlined"
            onClick={onCancel}
            disabled={loading}
            sx={{
              textTransform: "none",
              borderRadius: 999,
              fontWeight: 900,
              borderColor: "rgba(100,116,139,0.32)",
              color: "#475569",
            }}
          >
            Cancelar
          </Button>

          <Button
            type="submit"
            variant="contained"
            startIcon={<SaveRoundedIcon />}
            disabled={loading || !passwordSubmitState.canSubmit}
            sx={{
              textTransform: "none",
              borderRadius: 999,
              fontWeight: 950,
              bgcolor: "#8f1538",
              "&:hover": {
                bgcolor: "#7a1230",
              },
            }}
          >
            {loading ? "Guardando..." : "Guardar cambios"}
          </Button>
        </Stack>
      ) : null}
    </Box>
  );
}

ProfileForm.propTypes = {
  form: PropTypes.shape({
    nombre: PropTypes.string.isRequired,
    primer_apellido: PropTypes.string.isRequired,
    segundo_apellido: PropTypes.string.isRequired,
    correo_electronico: PropTypes.string.isRequired,
    curp: PropTypes.string.isRequired,
    entidad_federativa_id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    numero_telefono: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    confirmPassword: PropTypes.string.isRequired,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  isEditMode: PropTypes.bool.isRequired,
  passwordStrength: PropTypes.object.isRequired,
  passwordSubmitState: PropTypes.shape({
    canSubmit: PropTypes.bool.isRequired,
    reason: PropTypes.string,
  }).isRequired,
  onFieldChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};