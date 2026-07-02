import { useMemo, useReducer } from "react";
import { useNavigate } from "react-router-dom";
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

export default function LoginPage() {
  const navigate = useNavigate();
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

      /**
       * Limpiamos una sesión anterior antes de iniciar un nuevo flujo.
       * Esto evita que un token viejo afecte /login, /setup o /login/2fa.
       */
      clearAuthSession();

      const response = await loginRequest({
        curp: curpValue,
        password,
      });

      console.log("Respuesta login:", response);

      if (remember) {
        setRememberedUser(curpValue);
      } else {
        clearRememberedUser();
      }

      const status = response?.status;
      const tempUserId =
        response?.temp_user_id ||
        response?.tempUserId ||
        response?.user_id ||
        response?.userId;

      const isValidTwoFactorStatus =
        status === "pending_setup" || status === "pending_2fa";

      if (!isValidTwoFactorStatus || !tempUserId) {
        enqueueSnackbar("No se pudo determinar el flujo de autenticación.", {
          variant: "warning",
        });

        console.warn("Respuesta inesperada de /login:", response);
        return;
      }

      const challenge = {
        status,
        tempUserId: String(tempUserId),
        curp: curpValue,
        userHint: curpValue,
        message:
          response?.message ||
          (status === "pending_setup"
            ? "Es obligatorio configurar la seguridad de 2 pasos."
            : "Ingresa tu código de autenticación en dos pasos."),
      };

      /**
       * Guardamos el reto 2FA en el contexto de autenticación.
       * AuthContext también se encarga de persistir el respaldo temporal,
       * para que una recarga accidental no rompa el flujo.
       */
      startTwoFactorChallenge(challenge);

      enqueueSnackbar(
        status === "pending_setup"
          ? "Credenciales validadas. Ahora debes configurar la autenticación en dos pasos."
          : "Credenciales validadas. Ingresa tu código de verificación.",
        {
          variant: "info",
        }
      );

      navigate(routes.twoFactor || "/two-factor", {
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