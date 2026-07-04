import PropTypes from "prop-types";
import { Box, Stack, Typography } from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import RegistryAccessCard from "./RegistryAccessCard";

export default function DashboardModulesPanel({ registries, onSelectRegistry }) {
  return (
    <Box component="section">
      {registries.length > 0 ? (
        <Stack spacing={{ xs: 2, md: 2.4 }}>
          {registries.map((registry) => (
            <RegistryAccessCard
              key={registry.key}
              code={registry.code}
              title={registry.title}
              subtitle={registry.subtitle}
              description={registry.description}
              icon={registry.icon}
              canOpen={registry.canOpen}
              onClick={() => onSelectRegistry(registry.route)}
            />
          ))}
        </Stack>
      ) : (
        <EmptyRegistryState />
      )}
    </Box>
  );
}

DashboardModulesPanel.propTypes = {
  registries: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      code: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      subtitle: PropTypes.string,
      description: PropTypes.string.isRequired,
      icon: PropTypes.node.isRequired,
      route: PropTypes.string.isRequired,
      canOpen: PropTypes.bool,
    })
  ).isRequired,
  onSelectRegistry: PropTypes.func.isRequired,
};

function EmptyRegistryState() {
  return (
    <Box
      sx={{
        border: "1px solid rgba(15,23,42,0.08)",
        borderRadius: "18px",
        backgroundColor: "#ffffff",
        p: { xs: 3, sm: 4.5 },
        textAlign: "center",
        boxShadow: "0 16px 42px rgba(15,23,42,0.045)",
      }}
    >
      <Box
        sx={{
          width: 56,
          height: 56,
          mx: "auto",
          mb: 1.7,
          borderRadius: "50%",
          backgroundColor: "#9f2241",
          color: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <LockOutlinedIcon />
      </Box>

      <Typography
        sx={{
          fontFamily: "Noto Sans, sans-serif",
          fontWeight: 950,
          color: "#111827",
          mb: 0.8,
          fontSize: "1.05rem",
        }}
      >
        No hay módulos habilitados
      </Typography>

      <Typography
        sx={{
          fontFamily: "Noto Sans, sans-serif",
          color: "#64748b",
          fontSize: "0.95rem",
          lineHeight: 1.65,
          maxWidth: 640,
          mx: "auto",
        }}
      >
        Tu cuenta aún no tiene permisos asignados para ingresar a un registro.
        Contacta a un administrador para solicitar los accesos correspondientes.
      </Typography>
    </Box>
  );
}
