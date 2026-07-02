import { useMemo, useState } from "react";
import { Box } from "@mui/material";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

import AuthLayout from "../../../components/layout/AuthLayout";
import routes from "../../../app/routes";
import ForgotPasswordBackground from "../components/ForgotPasswordBackground";
import ForgotPasswordCard from "../components/ForgotPasswordCard";
import ForgotPasswordHero from "../components/ForgotPasswordHero";

function getEmailError(value) {
  if (!value.trim()) return "Ingresa tu correo.";
  if (!/\S+@\S+\.\S+/.test(value.trim())) return "Ingresa un correo válido.";
  return "";
}

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const emailError = useMemo(() => getEmailError(email), [email]);

  const canSubmit = useMemo(() => {
    return !emailError && !loading;
  }, [emailError, loading]);

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handleBackToLogin() {
    navigate(routes.login || "/login");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!canSubmit) return;

    try {
      setLoading(true);

      // Aquí después conectamos el backend real.
      await new Promise((resolve) => {
        setTimeout(resolve, 900);
      });

      setSubmitted(true);

      enqueueSnackbar("Se envió la solicitud de recuperación.", {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar("No se pudo procesar la solicitud.", {
        variant: "error",
      });

      console.error("Error en recuperación:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout>
      <ForgotPasswordBackground />

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "1200px",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1.05fr 0.95fr" },
            gap: { xs: 4, md: 6, lg: 8 },
            alignItems: "center",
          }}
        >
          <ForgotPasswordHero />

          <Box
            sx={{
              display: "flex",
              justifyContent: { xs: "center", lg: "flex-end" },
            }}
          >
            <ForgotPasswordCard
              email={email}
              emailError={emailError}
              loading={loading}
              submitted={submitted}
              canSubmit={canSubmit}
              onEmailChange={handleEmailChange}
              onSubmit={handleSubmit}
              onBackToLogin={handleBackToLogin}
            />
          </Box>
        </Box>
      </Box>
    </AuthLayout>
  );
}