import PropTypes from "prop-types";
import { TextField } from "@mui/material";

export default function TwoFactorCodeField({ value, onChange }) {
  return (
    <TextField
      label="Código de verificación"
      fullWidth
      value={value}
      onChange={onChange}
      autoComplete="one-time-code"
      inputProps={{
        inputMode: "numeric",
        pattern: "[0-9]*",
        maxLength: 6,
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
          "& input": {
            letterSpacing: "0.28em",
            fontWeight: 700,
            textAlign: "center",
          },
        },
      }}
    />
  );
}

TwoFactorCodeField.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};