const PASSWORD_REQUIREMENTS = [
  {
    key: "minLength",
    label: "Mínimo 8 caracteres",
    test: (value) => value.length >= 8,
  },
  {
    key: "uppercase",
    label: "Una letra mayúscula",
    test: (value) => /[A-Z]/.test(value),
  },
  {
    key: "lowercase",
    label: "Una letra minúscula",
    test: (value) => /[a-z]/.test(value),
  },
  {
    key: "number",
    label: "Un número",
    test: (value) => /\d/.test(value),
  },
  {
    key: "specialChar",
    label: "Un carácter especial",
    test: (value) => /[^A-Za-z0-9\s]/.test(value),
  },
  {
    key: "noSpaces",
    label: "Sin espacios",
    test: (value) => value.length > 0 && !/\s/.test(value),
  },
];

export function evaluatePasswordStrength(password = "") {
  const value = String(password || "");

  const requirements = PASSWORD_REQUIREMENTS.map((requirement) => ({
    key: requirement.key,
    label: requirement.label,
    isValid: requirement.test(value),
  }));

  const passedCount = requirements.filter((requirement) => requirement.isValid)
    .length;

  const isEmpty = value.length === 0;
  const isStrong = !isEmpty && passedCount === requirements.length;

  let level = "empty";
  let label = "Sin contraseña nueva";
  let helperText =
    "Deja este campo vacío si no deseas cambiar tu contraseña.";

  if (!isEmpty && passedCount <= 2) {
    level = "weak";
    label = "Débil";
    helperText = "La contraseña aún no cumple los requisitos mínimos.";
  }

  if (!isEmpty && passedCount >= 3 && passedCount <= 5) {
    level = "medium";
    label = "Media";
    helperText = "Vas bien, pero aún faltan requisitos por cumplir.";
  }

  if (isStrong) {
    level = "strong";
    label = "Fuerte";
    helperText = "La contraseña cumple con los requisitos de seguridad.";
  }

  return {
    isEmpty,
    isStrong,
    level,
    label,
    helperText,
    passedCount,
    totalCount: requirements.length,
    requirements,
  };
}

export function canSubmitPasswordChange({ password, confirmPassword }) {
  const passwordValue = String(password || "");
  const confirmPasswordValue = String(confirmPassword || "");
  const strength = evaluatePasswordStrength(passwordValue);

  if (!passwordValue) {
    return {
      canSubmit: true,
      reason: "",
      strength,
    };
  }

  if (!strength.isStrong) {
    return {
      canSubmit: false,
      reason: "La contraseña no cumple los requisitos de seguridad.",
      strength,
    };
  }

  if (passwordValue !== confirmPasswordValue) {
    return {
      canSubmit: false,
      reason: "La contraseña y su confirmación no coinciden.",
      strength,
    };
  }

  return {
    canSubmit: true,
    reason: "",
    strength,
  };
}