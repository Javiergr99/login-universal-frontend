import PropTypes from "prop-types";
import { TextField } from "@mui/material";

export default function ProfileField({
  label,
  name = "",
  value,
  onChange = undefined,
  disabled = false,
  type = "text",
  inputProps = undefined,
}) {
  return (
    <TextField
      label={label}
      name={name}
      value={value || ""}
      onChange={onChange}
      disabled={disabled}
      type={type}
      fullWidth
      inputProps={inputProps}
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "14px",
          backgroundColor: disabled ? "rgba(248,250,252,0.76)" : "#ffffff",
        },
      }}
    />
  );
}

ProfileField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  inputProps: PropTypes.object,
};