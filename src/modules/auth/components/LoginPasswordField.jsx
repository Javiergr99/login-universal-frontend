import PropTypes from "prop-types";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function LoginPasswordField({
  value,
  showPassword,
  onChange,
  onTogglePasswordVisibility,
}) {
  return (
    <TextField
      label="Contraseña"
      type={showPassword ? "text" : "password"}
      fullWidth
      value={value}
      onChange={onChange}
      autoComplete="current-password"
      InputLabelProps={{
        sx: {
          color: "rgba(255,255,255,0.78)",
          fontFamily: "Noto Sans, sans-serif",
          "&.Mui-focused": {
            color: "#ffffff",
          },
        },
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment
            position="end"
            sx={{
              mr: 0.5,
              width: 32,
              height: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconButton
              aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              onClick={onTogglePasswordVisibility}
              disableRipple
              sx={{
                width: 32,
                height: 32,
                p: 0,
                m: 0,
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
            >
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                style={{ fontSize: 14 }}
              />
            </IconButton>
          </InputAdornment>
        ),
        sx: {
          height: 52,
          backgroundColor: "rgba(255,255,255,0.08)",
          borderRadius: "14px",
          color: "#ffffff",
          fontFamily: "Noto Sans, sans-serif",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(255,255,255,0.18)",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(255,255,255,0.28)",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(255,255,255,0.36)",
            borderWidth: "1px",
          },
          "&.Mui-focused": {
            boxShadow: "0 0 0 4px rgba(255,255,255,0.08)",
          },
          "& input::-ms-reveal": {
            display: "none",
          },
          "& input::-ms-clear": {
            display: "none",
          },
          "& input::-webkit-credentials-auto-fill-button": {
            display: "none !important",
            visibility: "hidden",
            pointerEvents: "none",
          },
          "& input:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 1000px rgba(255,255,255,0.08) inset",
            WebkitTextFillColor: "#ffffff",
            caretColor: "#ffffff",
            borderRadius: "14px",
            transition: "background-color 9999s ease-out, color 9999s ease-out",
          },
          "& input:-webkit-autofill:hover": {
            WebkitBoxShadow: "0 0 0 1000px rgba(255,255,255,0.08) inset",
            WebkitTextFillColor: "#ffffff",
            caretColor: "#ffffff",
            borderRadius: "14px",
          },
          "& input:-webkit-autofill:focus": {
            WebkitBoxShadow: "0 0 0 1000px rgba(255,255,255,0.08) inset",
            WebkitTextFillColor: "#ffffff",
            caretColor: "#ffffff",
            borderRadius: "14px",
          },
        },
      }}
    />
  );
}

LoginPasswordField.propTypes = {
  value: PropTypes.string.isRequired,
  showPassword: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onTogglePasswordVisibility: PropTypes.func.isRequired,
};