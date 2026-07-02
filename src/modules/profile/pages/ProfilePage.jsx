import { useMemo, useReducer } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Box, Divider } from "@mui/material";
import { useSnackbar } from "notistack";

import routes from "../../../app/routes";
import { useAuth } from "../../../hooks/useAuth";
import { getStoredAuthSession } from "../../../utils/storage";
import { getErrorMessage } from "../../auth/helpers/auth.helper";

import ProfileForm from "../components/ProfileForm";
import ProfilePageHeader from "../components/ProfilePageHeader";
import ProfileUserSummary from "../components/ProfileUserSummary";
import {
  buildUserUpdatePayload,
  updateUserProfileRequest,
} from "../services/profile.service";
import {
  canSubmitPasswordChange,
  evaluatePasswordStrength,
} from "../utils/passwordStrength";

const PROFILE_ACTIONS = {
  SET_FIELD: "SET_FIELD",
  SET_LOADING: "SET_LOADING",
  SYNC_USER: "SYNC_USER",
};

function getInitialForm(user) {
  return {
    nombre: user?.nombre || "",
    primer_apellido: user?.primer_apellido || "",
    segundo_apellido: user?.segundo_apellido || "",
    correo_electronico: user?.correo_electronico || "",
    curp: user?.curp || "",
    entidad_federativa_id: user?.entidad_federativa_id || "",
    numero_telefono: user?.numero_telefono || "",
    password: "",
    confirmPassword: "",
  };
}

function profileReducer(state, action) {
  switch (action.type) {
    case PROFILE_ACTIONS.SET_FIELD:
      return {
        ...state,
        form: {
          ...state.form,
          [action.field]: action.value,
        },
      };

    case PROFILE_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: Boolean(action.payload),
      };

    case PROFILE_ACTIONS.SYNC_USER:
      return {
        ...state,
        form: getInitialForm(action.payload),
        loading: false,
      };

    default:
      return state;
  }
}

function getFullName(user) {
  return [user?.nombre, user?.primer_apellido, user?.segundo_apellido]
    .filter(Boolean)
    .join(" ")
    .trim();
}

function getProfileMode(searchParams) {
  return searchParams.get("mode") === "edit" ? "edit" : "view";
}

function mergeUpdatedUserWithCurrentPermissions({ currentUser, updatedUser }) {
  return {
    ...(currentUser || {}),
    ...(updatedUser || {}),
    permisos: updatedUser?.permisos || currentUser?.permisos || null,
  };
}

export default function ProfilePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { enqueueSnackbar } = useSnackbar();
  const { user: authUser, completeLogin } = useAuth();

  const storedSession = getStoredAuthSession();
  const currentUser = authUser || storedSession.user;

  const mode = getProfileMode(searchParams);
  const isEditMode = mode === "edit";

  const [state, dispatch] = useReducer(profileReducer, {
    form: getInitialForm(currentUser),
    loading: false,
  });

  const { form, loading } = state;

  const passwordStrength = useMemo(() => {
    return evaluatePasswordStrength(form.password);
  }, [form.password]);

  const passwordSubmitState = useMemo(() => {
    return canSubmitPasswordChange({
      password: form.password,
      confirmPassword: form.confirmPassword,
    });
  }, [form.password, form.confirmPassword]);

  const fullName = useMemo(() => {
    return getFullName(currentUser) || "Usuario";
  }, [currentUser]);

  function updateField(event) {
    const { name, value } = event.target;

    dispatch({
      type: PROFILE_ACTIONS.SET_FIELD,
      field: name,
      value:
        name === "curp"
          ? value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 18)
          : value,
    });
  }

  function goToDashboard() {
    navigate(routes.dashboard);
  }

  function goToViewMode() {
    navigate(`${routes.profile}?mode=view`, { replace: true });
  }

  function goToEditMode() {
    navigate(`${routes.profile}?mode=edit`, { replace: true });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!currentUser?.id) {
      enqueueSnackbar("No se pudo determinar el usuario actual.", {
        variant: "error",
      });
      return;
    }

    if (!passwordSubmitState.canSubmit) {
      enqueueSnackbar(passwordSubmitState.reason, {
        variant: "warning",
      });
      return;
    }

    try {
      dispatch({
        type: PROFILE_ACTIONS.SET_LOADING,
        payload: true,
      });

      const payload = buildUserUpdatePayload(form);

      const updatedUser = await updateUserProfileRequest({
        userId: currentUser.id,
        payload,
      });

      const nextUser = mergeUpdatedUserWithCurrentPermissions({
        currentUser,
        updatedUser,
      });

      completeLogin({
        token: storedSession.token,
        refreshToken: storedSession.refreshToken,
        tokenType: storedSession.tokenType || "bearer",
        user: nextUser,
      });

      dispatch({
        type: PROFILE_ACTIONS.SYNC_USER,
        payload: nextUser,
      });

      enqueueSnackbar("Datos actualizados correctamente.", {
        variant: "success",
      });

      navigate(`${routes.profile}?mode=view`, { replace: true });
    } catch (error) {
      enqueueSnackbar(
        getErrorMessage(error, "No fue posible actualizar tus datos."),
        {
          variant: "error",
        }
      );

      console.error("Error al actualizar perfil:", error);
    } finally {
      dispatch({
        type: PROFILE_ACTIONS.SET_LOADING,
        payload: false,
      });
    }
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        px: { xs: 2, sm: 3, md: 4 },
        py: { xs: 3, sm: 4, md: 5 },
        background:
          "radial-gradient(circle at 10% 8%, rgba(159,34,65,0.12) 0%, transparent 28%), radial-gradient(circle at 90% 12%, rgba(188,149,92,0.15) 0%, transparent 30%), linear-gradient(135deg, #f8fafc 0%, #f3f4f6 52%, #f7f1e9 100%)",
        fontFamily: "Noto Sans, sans-serif",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "980px",
          mx: "auto",
        }}
      >
        <ProfilePageHeader onBack={goToDashboard} />

        <Box
          sx={{
            borderRadius: { xs: "26px", md: "34px" },
            background: "rgba(255,255,255,0.78)",
            border: "1px solid rgba(255,255,255,0.82)",
            boxShadow:
              "0 28px 80px rgba(15,23,42,0.10), inset 0 1px 0 rgba(255,255,255,0.9)",
            backdropFilter: "blur(20px)",
            overflow: "hidden",
          }}
        >
          <Box sx={{ p: { xs: 3, sm: 4 } }}>
            <ProfileUserSummary
              fullName={fullName}
              email={currentUser?.correo_electronico || ""}
              isEditMode={isEditMode}
              onViewMode={goToViewMode}
              onEditMode={goToEditMode}
            />

            <Divider sx={{ mb: 3 }} />

            <ProfileForm
              form={form}
              loading={loading}
              isEditMode={isEditMode}
              passwordStrength={passwordStrength}
              passwordSubmitState={passwordSubmitState}
              onFieldChange={updateField}
              onSubmit={handleSubmit}
              onCancel={goToViewMode}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}