import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import routes from "../../../app/routes";
import { useAuth } from "../../../hooks/useAuth";
import {
  clearPostLoginWelcomeFlag,
  getStoredAuthSession,
} from "../../../utils/storage";
import { getAuthUserDisplayName } from "../helpers/auth.helper";
import {
  buildRedirectCodeUrl,
  clearStoredAuthRedirectTarget,
  getCleanRedirectUrl,
  getStoredAuthRedirectTarget,
  isExternalRedirectTarget,
} from "../../../utils/authRedirect";
import { createRedirectCodeRequest } from "../services/auth.service";

const POST_LOGIN_REDIRECT_DELAY_MS = 2100;

const loadingMessages = [
  "Verificando permisos de acceso",
  "Preparando módulos disponibles",
  "Abriendo tu espacio de trabajo",
];

export function usePostLoginWelcome() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [messageIndex, setMessageIndex] = useState(0);

  const sessionUser = useMemo(() => {
    return user || getStoredAuthSession().user;
  }, [user]);

  const redirectTarget = useMemo(() => {
    return getStoredAuthRedirectTarget();
  }, []);

  const displayName = getAuthUserDisplayName(sessionUser);
  const currentMessage = loadingMessages[messageIndex];

  useEffect(() => {
    const messageTimer = window.setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 620);

    const redirectTimer = window.setTimeout(() => {
      async function redirectAfterWelcome() {
        clearPostLoginWelcomeFlag();

        if (!redirectTarget) {
          navigate(routes.dashboard, {
            replace: true,
          });
          return;
        }

        clearStoredAuthRedirectTarget();

        if (isExternalRedirectTarget(redirectTarget)) {
          try {
            const cleanRedirectUrl = getCleanRedirectUrl(redirectTarget);

            const redirectCodeResponse = await createRedirectCodeRequest({
              redirectUrl: cleanRedirectUrl,
            });

            const finalRedirectUrl = buildRedirectCodeUrl({
              redirectUrl: cleanRedirectUrl,
              code: redirectCodeResponse?.code,
            });

            if (finalRedirectUrl) {
              window.location.replace(finalRedirectUrl);
              return;
            }
          } catch (error) {
            console.warn(
              "No fue posible generar el código temporal de redirección:",
              error
            );
          }

          navigate(routes.dashboard, {
            replace: true,
          });

          return;
        }

        navigate(redirectTarget, {
          replace: true,
        });
      }

      redirectAfterWelcome();
    }, POST_LOGIN_REDIRECT_DELAY_MS);

    return () => {
      window.clearInterval(messageTimer);
      window.clearTimeout(redirectTimer);
    };
  }, [navigate, redirectTarget]);

  return {
    currentMessage,
    displayName,
    redirectDelayMs: POST_LOGIN_REDIRECT_DELAY_MS,
  };
}
