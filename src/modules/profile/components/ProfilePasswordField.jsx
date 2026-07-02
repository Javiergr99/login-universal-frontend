import { useState } from "react";
import PropTypes from "prop-types";
import { IconButton, InputAdornment, TextField } from "@mui/material";

import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";

export default function ProfilePasswordField({
  label,
  name,
  value,
  onChange,
  disabled = false,
}) {
  const [showPassword, setShowPassword] = useState(false);

  function togglePasswordVisibility() {
    setShowPassword((prev) => !prev);
  }

  return (
    <TextField
      label={label}
      name={name}
      value={value || ""}
      onChange={onChange}
      disabled={disabled}
      type={showPassword ? "text" : "password"}
      fullWidth
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              type="button"
              aria-label={
                showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
              }
              onClick={togglePasswordVisibility}
              edge="end"
              disabled={disabled}
              sx={{
                color: "#8f1538",
              }}
            >
              {showPassword ? (
                <VisibilityOffRoundedIcon />
              ) : (
                <VisibilityRoundedIcon />
              )}
            </IconButton>
          </InputAdornment>
        ),
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "14px",
          backgroundColor: disabled ? "rgba(248,250,252,0.76)" : "#ffffff",
        },
      }}
    />
  );
}

ProfilePasswordField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};