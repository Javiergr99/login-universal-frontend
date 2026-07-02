const routes = {
  root: "/",
  login: "/login",
  forgotPassword: "/forgot-password",
  twoFactor: "/auth/verificacion-2fa",
  postLoginWelcome: "/auth/bienvenida",
  dashboard: "/dashboard",
  profile: "/perfil",

  /**
   * URL externa del frontend de Medidas de Protección.
   * Esta ruta NO se registra en el router del Login Universal.
   */
  medidas:
    import.meta.env.VITE_MEDIDAS_FRONTEND_URL || "http://localhost:5173/medidas",
};

export default routes;