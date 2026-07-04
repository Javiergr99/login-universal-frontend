import { useEffect, useMemo, useReducer } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { useSnackbar } from "notistack";

import AuthLayout from "../../../components/layout/AuthLayout";
import routes from "../../../app/routes";
import { useAuth } from "../../../hooks/useAuth";
import { clearAuthSession, loginRequest } from "../services/auth.service";
import { getErrorMessage } from "../helpers/auth.helper";
import {
  clearRememberedUser,
  getRememberedUser,
  setRememberedUser,
} from "../../../utils/storage";
import {
  SESSION_INACTIVITY_MESSAGE,
  SESSION_INACTIVITY_REASON,
} from "../../../utils/sessionInactivity";

import LoginAccessCard from "../components/LoginAccessCard";
import LoginBackground from "../components/LoginBackground";
import LoginHero from "../components/LoginHero";

const LOGIN_ACTIONS = {
  SET_CURP: "SET_CURP",
  SET_PASSWORD: "SET_PASSWORD",
  SET_REMEMBER: "SET_REMEMBER",
  SET_LOADING: "SET_LOADING",
  TOGGLE_PASSWORD_VISIBILITY: "TOGGLE_PASSWORD_VISIBILITY",
};

function normalizeCurp(value) {
  return String(value || "")
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 18);
}

function createInitialLoginState() {
  const rememberedUser = getRememberedUser();

  return {
    curp: rememberedUser || "",
    password: "",
    remember: Boolean(rememberedUser),
    loading: false,
    showPassword: false,
  };
}

function loginReducer(state, action) {
  switch (action.type) {
    case LOGIN_ACTIONS.SET_CURP:
      return {
        ...state,
        curp: normalizeCurp(action.payload),
      };

    case LOGIN_ACTIONS.SET_PASSWORD:
      return {
        ...state,
        password: action.payload || "",
      };

    case LOGIN_ACTIONS.SET_REMEMBER:
      return {
        ...state,
        remember: Boolean(action.payload),
      };

    case LOGIN_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: Boolean(action.payload),
      };

    case LOGIN_ACTIONS.TOGGLE_PASSWORD_VISIBILITY:
      return {
        ...state,
        showPassword: !state.showPassword,
      };

    default:
      return state;
  }
}

function normalizeTempToken(response) {
  return String(
    response?.temp_token ||
      response?.tempToken ||
      response?.token ||
      ""
  ).trim();
}

function getTwoFactorHelpMessage(status, fallbackMessage = "") {
  const baseMessage =
    fallbackMessage ||
    (status === "pending_setup"
      ? "Es obligatorio configurar la seguridad de 2 pasos."
      : "Ingresa tu código de autenticación en dos pasos.");

  return `${baseMessage} Asegúrate de que tu dispositivo tenga fecha y hora automáticas para evitar desfases con Google Authenticator.`;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();
  const { startTwoFactorChallenge } = useAuth();

  const [state, dispatch] = useReducer(
    loginReducer,
    undefined,
    createInitialLoginState
  );

  const { curp, password, remember, loading, showPassword } = state;

  const canSubmit = useMemo(() => {
    return curp.trim().length === 18 && password.trim().length > 0 && !loading;
  }, [curp, password, loading]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search || "");
    const reason = searchParams.get("reason");

    if (reason !== SESSION_INACTIVITY_REASON) {
      return;
    }

    enqueueSnackbar(SESSION_INACTIVITY_MESSAGE, {
      variant: "warning",
    });

    searchParams.delete("reason");

    const nextSearch = searchParams.toString();

    navigate(
      {
        pathname: location.pathname,
        search: nextSearch ? `?${nextSearch}` : "",
      },
      {
        replace: true,
      }
    );
  }, [enqueueSnackbar, location.pathname, location.search, navigate]);

  function handleCurpChange(event) {
    dispatch({
      type: LOGIN_ACTIONS.SET_CURP,
      payload: event.target.value,
    });
  }

  function handlePasswordChange(event) {
    dispatch({
      type: LOGIN_ACTIONS.SET_PASSWORD,
      payload: event.target.value,
    });
  }

  function handleRememberChange(event) {
    dispatch({
      type: LOGIN_ACTIONS.SET_REMEMBER,
      payload: event.target.checked,
    });
  }

  function handleTogglePasswordVisibility() {
    dispatch({
      type: LOGIN_ACTIONS.TOGGLE_PASSWORD_VISIBILITY,
    });
  }

  function handleForgotPassword() {
    navigate(routes.forgotPassword || "/login");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!canSubmit) return;

    const curpValue = curp.trim().toUpperCase();

    try {
      dispatch({
        type: LOGIN_ACTIONS.SET_LOADING,
        payload: true,
      });

      clearAuthSession();

      const response = await loginRequest({
        curp: curpValue,
        password,
      });

      if (remember) {
        setRememberedUser(curpValue);
      } else {
        clearRememberedUser();
      }

      const status = response?.status;
      const tempToken = normalizeTempToken(response);

      const isValidTwoFactorStatus =
        status === "pending_setup" || status === "pending_2fa";

      if (!isValidTwoFactorStatus || !tempToken) {
        enqueueSnackbar("No se pudo determinar el flujo de autenticación.", {
          variant: "warning",
        });

        console.warn("Respuesta inesperada de /auth/login.");
        return;
      }

      const challenge = {
        status,
        tempToken,
        curp: curpValue,
        userHint: curpValue,
        message: getTwoFactorHelpMessage(status, response?.message),
      };

      startTwoFactorChallenge(challenge);

      enqueueSnackbar(
        status === "pending_setup"
          ? "Credenciales validadas. Ahora debes configurar la autenticación en dos pasos."
          : "Credenciales validadas. Ingresa tu código de verificación.",
        {
          variant: "info",
        }
      );

      navigate(routes.twoFactor || "/auth/verificacion-2fa", {
        replace: true,
        state: {
          challenge,
        },
      });
    } catch (error) {
      enqueueSnackbar(getErrorMessage(error, "No se pudo iniciar sesión."), {
        variant: "error",
      });

      console.error("Error en login:", error);
    } finally {
      dispatch({
        type: LOGIN_ACTIONS.SET_LOADING,
        payload: false,
      });
    }
  }

  return (
    <AuthLayout>
      <LoginBackground />

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
          <LoginHero />

          <Box
            sx={{
              display: "flex",
              justifyContent: { xs: "center", lg: "flex-end" },
            }}
          >
            <LoginAccessCard
              curp={curp}
              password={password}
              remember={remember}
              loading={loading}
              showPassword={showPassword}
              canSubmit={canSubmit}
              onSubmit={handleSubmit}
              onCurpChange={handleCurpChange}
              onPasswordChange={handlePasswordChange}
              onRememberChange={handleRememberChange}
              onTogglePasswordVisibility={handleTogglePasswordVisibility}
              onForgotPassword={handleForgotPassword}
            />
          </Box>
        </Box>
      </Box>
    </AuthLayout>
  );
}
