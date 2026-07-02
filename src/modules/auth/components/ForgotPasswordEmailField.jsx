import PropTypes from "prop-types";
import { InputAdornment, TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export default function ForgotPasswordEmailField({
  value,
  errorMessage,
  onChange,
}) {
  return (
    <TextField
      label="Correo"
      fullWidth
      value={value}
      onChange={onChange}
      autoComplete="email"
      error={Boolean(value && errorMessage)}
      helperText={value ? errorMessage : " "}
      FormHelperTextProps={{
        sx: {
          color: "rgba(255,255,255,0.72)",
          fontFamily: "Noto Sans, sans-serif",
          ml: 0.5,
        },
      }}
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
            <FontAwesomeIcon
              icon={faEnvelope}
              style={{
                fontSize: 14,
                color: "#ffffff",
              }}
            />
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

ForgotPasswordEmailField.propTypes = {
  value: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};