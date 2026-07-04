import { useEffect, useMemo, useReducer, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

import routes from "../../../app/routes";
import { useAuth } from "../../../hooks/useAuth";
import {
  clearPostLoginWelcomeFlag,
  setPostLoginWelcomeFlag,
} from "../../../utils/storage";
import {
  getErrorMessage,
  normalizeFinalSession,
  normalizeUserProfile,
} from "../helpers/auth.helper";
import {
  clearTwoFactorTempSession,
  enableTwoFactorRequest,
  fetchTwoFactorSetupQr,
  getCurrentUserProfile,
  getTwoFactorTempSession,
  saveAuthToken,
  saveAuthUser,
  saveRefreshToken,
  saveTokenType,
  verifyTwoFactorRequest,
} from "../services/auth.service";

const TWO_FACTOR_ACTIONS = {
  SET_VERIFICATION_CODE: "SET_VERIFICATION_CODE",
  SET_SUBMIT_LOADING: "SET_SUBMIT_LOADING",
  QR_REQUEST_STARTED: "QR_REQUEST_STARTED",
  QR_REQUEST_SUCCEEDED: "QR_REQUEST_SUCCEEDED",
  QR_REQUEST_FAILED: "QR_REQUEST_FAILED",
};

const initialTwoFactorState = {
  verificationCode: "",
  loading: false,
  qrLoading: false,
  localQrImageUrl: null,
};

function normalizeVerificationCode(value) {
  return String(value || "")
    .replace(/\D/g, "")
    .slice(0, 6);
}

function twoFactorReducer(state, action) {
  switch (action.type) {
    case TWO_FACTOR_ACTIONS.SET_VERIFICATION_CODE:
      return {
        ...state,
        verificationCode: normalizeVerificationCode(action.payload),
      };

    case TWO_FACTOR_ACTIONS.SET_SUBMIT_LOADING:
      return {
        ...state,
        loading: Boolean(action.payload),
      };

    case TWO_FACTOR_ACTIONS.QR_REQUEST_STARTED:
      return {
        ...state,
        qrLoading: true,
      };

    case TWO_FACTOR_ACTIONS.QR_REQUEST_SUCCEEDED:
      return {
        ...state,
        qrLoading: false,
        localQrImageUrl: action.payload || null,
      };

    case TWO_FACTOR_ACTIONS.QR_REQUEST_FAILED:
      return {
        ...state,
        qrLoading: false,
      };

    default:
      return state;
  }
}

export function useTwoFactorFlow() {
  const navigate = useNavigate();
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();

  const {
    pendingTwoFactor,
    completeLogin,
    updatePendingTwoFactorChallenge,
    clearTwoFactorChallenge,
  } = useAuth();

  const [state, dispatch] = useReducer(
    twoFactorReducer,
    initialTwoFactorState
  );

  const { verificationCode, loading, qrLoading, localQrImageUrl } = state;

  const qrObjectUrlRef = useRef(null);

  const storedTwoFactor = useMemo(() => getTwoFactorTempSession(), []);
  const routeChallenge = location.state?.challenge || null;

  const activeChallenge =
    pendingTwoFactor ||
    routeChallenge ||
    (storedTwoFactor?.tempToken
      ? {
          tempToken: storedTwoFactor.tempToken,
          status: storedTwoFactor.status,
        }
      : null);

  const challengeStatus = activeChallenge?.status || "";
  const isSetupMode = challengeStatus === "pending_setup";

  const qrImageUrl =
    pendingTwoFactor?.qrImageUrl ||
    localQrImageUrl ||
    activeChallenge?.qrImageUrl ||
    null;

  const tempToken =
    activeChallenge?.tempToken ||
    activeChallenge?.temp_token ||
    activeChallenge?.token ||
    "";

  const canSubmit = useMemo(() => {
    return (
      verificationCode.trim().length === 6 &&
      !loading &&
      Boolean(tempToken)
    );
  }, [verificationCode, loading, tempToken]);

  useEffect(() => {
    if (!activeChallenge || !tempToken || !challengeStatus) {
      navigate(routes.login || "/login", { replace: true });
    }
  }, [activeChallenge, challengeStatus, navigate, tempToken]);

  useEffect(() => {
    let isMounted = true;

    async function loadSetupQr() {
      if (!isSetupMode || !tempToken || qrImageUrl) return;

      dispatch({
        type: TWO_FACTOR_ACTIONS.QR_REQUEST_STARTED,
      });

      try {
        const qrBlob = await fetchTwoFactorSetupQr({
          tempToken,
        });

        const objectUrl = URL.createObjectURL(qrBlob);

        if (qrObjectUrlRef.current) {
          URL.revokeObjectURL(qrObjectUrlRef.current);
        }

        qrObjectUrlRef.current = objectUrl;

        if (!isMounted) return;

        dispatch({
          type: TWO_FACTOR_ACTIONS.QR_REQUEST_SUCCEEDED,
          payload: objectUrl,
        });

        if (typeof updatePendingTwoFactorChallenge === "function") {
          updatePendingTwoFactorChallenge({
            qrImageUrl: objectUrl,
          });
        }
      } catch (error) {
        if (isMounted) {
          dispatch({
            type: TWO_FACTOR_ACTIONS.QR_REQUEST_FAILED,
          });
        }

        enqueueSnackbar(
          getErrorMessage(error, "No fue posible generar el código QR."),
          { variant: "error" }
        );

        console.error("Error al generar QR 2FA:", error);
      }
    }

    loadSetupQr();

    return () => {
      isMounted = false;
    };
  }, [
    enqueueSnackbar,
    isSetupMode,
    qrImageUrl,
    tempToken,
    updatePendingTwoFactorChallenge,
  ]);

  useEffect(() => {
    return () => {
      if (qrObjectUrlRef.current) {
        URL.revokeObjectURL(qrObjectUrlRef.current);
        qrObjectUrlRef.current = null;
      }
    };
  }, []);

  function handleCodeChange(event) {
    dispatch({
      type: TWO_FACTOR_ACTIONS.SET_VERIFICATION_CODE,
      payload: event.target.value,
    });
  }

  function handleBackToLogin() {
    clearPostLoginWelcomeFlag();
    clearTwoFactorChallenge();
    clearTwoFactorTempSession();
    navigate(routes.login || "/login", { replace: true });
  }

  async function finishAuthenticatedSession(sessionData) {
    const finalSession = normalizeFinalSession(sessionData);

    if (!finalSession?.token) {
      throw new Error("No se recibió un token válido del backend.");
    }

    if (!finalSession?.refreshToken) {
      console.warn(
        "El backend no devolvió refresh_token. El access_token funcionará, pero la sesión no podrá renovarse automáticamente."
      );
    }

    saveAuthToken(finalSession.token);
    saveRefreshToken(finalSession.refreshToken);
    saveTokenType(finalSession.tokenType || "bearer");

    let currentUser = null;

    try {
      const profileResponse = await getCurrentUserProfile();
      currentUser = normalizeUserProfile(profileResponse);
      saveAuthUser(currentUser);
    } catch (profileError) {
      console.warn(
        "La verificación fue correcta, pero no se pudo consultar /users/me:",
        profileError
      );
    }

    completeLogin({
      token: finalSession.token,
      refreshToken: finalSession.refreshToken,
      tokenType: finalSession.tokenType || "bearer",
      user: currentUser,
    });

    clearTwoFactorChallenge();
    clearTwoFactorTempSession();
    setPostLoginWelcomeFlag(true);

    enqueueSnackbar("Verificación completada correctamente.", {
      variant: "success",
    });

    navigate(routes.postLoginWelcome || routes.dashboard || "/", {
      replace: true,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!canSubmit) return;

    const cleanCode = verificationCode.replace(/\D/g, "").slice(0, 6);

    try {
      dispatch({
        type: TWO_FACTOR_ACTIONS.SET_SUBMIT_LOADING,
        payload: true,
      });

      const sessionResponse = isSetupMode
        ? await enableTwoFactorRequest({
            tempToken,
            code: cleanCode,
          })
        : await verifyTwoFactorRequest({
            tempToken,
            code: cleanCode,
          });

      await finishAuthenticatedSession(sessionResponse);
    } catch (error) {
      enqueueSnackbar(
        getErrorMessage(
          error,
          "No fue posible validar el código de verificación."
        ),
        {
          variant: "error",
        }
      );

      console.error("Error al verificar 2FA:", error);
    } finally {
      dispatch({
        type: TWO_FACTOR_ACTIONS.SET_SUBMIT_LOADING,
        payload: false,
      });
    }
  }

  return {
    activeChallenge,
    canSubmit,
    handleBackToLogin,
    handleCodeChange,
    handleSubmit,
    isSetupMode,
    loading,
    qrImageUrl,
    qrLoading,
    verificationCode,
  };
}
