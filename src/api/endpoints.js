const endpoints = {
  auth: {
    login: "/auth/login",
    me: "/users/me",
    setupTwoFactor: "/auth/setup",
    enableTwoFactor: "/auth/enable",
    verifyTwoFactor: "/auth/login/2fa",
    refresh: "/auth/refresh",
    logout: "/auth/logout",
    redirectCode: "/auth/redirect-code",
    exchangeCode: "/auth/exchange-code",
    resetPassword: "/auth/restablecer-password",
  },

  users: {
    me: "/users/me",
    list: "/users",
    create: "/users",
    update: (userId) => `/users/${userId}`,
    catalogPermissions: "/users/catalogo-permisos",
  },

  registros: {
    list: "/registros/",
    create: "/registros/",
    updateDatosGenerales: (registroId) =>
      `/registros/${registroId}/datos-generales`,
    enviarRevision: (registroId) =>
      `/registros/${registroId}/enviar-revision`,
    aprobar: (registroId) => `/registros/${registroId}/aprobar`,
    devolver: (registroId) => `/registros/${registroId}/devolver`,
  },
};

export default endpoints;
