const endpoints = {
  auth: {
    login: "/login",
    me: "/users/me",
    setupTwoFactor: "/setup",
    enableTwoFactor: "/enable",
    verifyTwoFactor: "/login/2fa",
    refresh: "/refresh",
    logout: "/logout",
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