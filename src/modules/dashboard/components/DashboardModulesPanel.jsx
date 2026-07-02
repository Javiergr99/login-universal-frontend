import PropTypes from "prop-types";
import { Box, Chip, Divider, Stack, Typography } from "@mui/material";

import DashboardCustomizeRoundedIcon from "@mui/icons-material/DashboardCustomizeRounded";
import AppsRoundedIcon from "@mui/icons-material/AppsRounded";

import RegistryAccessCard from "./RegistryAccessCard";

export default function DashboardModulesPanel({ registries, onSelectRegistry }) {
  return (
    <Box
      sx={{
        borderRadius: { xs: "26px", md: "34px" },
        p: { xs: 1.3, sm: 1.6, md: 2 },
        background: "rgba(255,255,255,0.56)",
        border: "1px solid rgba(255,255,255,0.76)",
        boxShadow:
          "0 24px 70px rgba(15,23,42,0.08), inset 0 1px 0 rgba(255,255,255,0.82)",
        backdropFilter: "blur(18px)",
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        spacing={1.5}
        sx={{ px: { xs: 1, md: 1.5 }, py: 1, mb: 1 }}
      >
        <Box>
          <Stack direction="row" alignItems="center" spacing={1}>
            <DashboardCustomizeRoundedIcon
              sx={{
                color: "#8f1538",
                fontSize: 22,
              }}
            />

            <Typography
              sx={{
                fontFamily: "Noto Sans, sans-serif",
                fontWeight: 950,
                color: "#1f2937",
                fontSize: "1rem",
              }}
            >
              Selecciona un módulo
            </Typography>
          </Stack>

          <Typography
            sx={{
              mt: 0.4,
              fontFamily: "Noto Sans, sans-serif",
              color: "#64748b",
              fontSize: "0.84rem",
              lineHeight: 1.5,
            }}
          >
            Los accesos disponibles se muestran de acuerdo con los grupos,
            módulos y acciones asignados a tu perfil.
          </Typography>
        </Box>

        <Chip
          icon={<AppsRoundedIcon />}
          label={`${registries.length} disponibles`}
          sx={{
            borderRadius: 999,
            color: "#8f1538",
            backgroundColor: "rgba(159,34,65,0.07)",
            border: "1px solid rgba(159,34,65,0.10)",
            fontFamily: "Noto Sans, sans-serif",
            fontWeight: 900,
            "& .MuiChip-icon": {
              color: "#8f1538",
            },
          }}
        />
      </Stack>

      <Divider
        sx={{
          mb: 1.5,
          borderColor: "rgba(15,23,42,0.06)",
        }}
      />

      <Stack spacing={1.55}>
        {registries.length > 0 ? (
          registries.map((registry, index) => (
            <RegistryAccessCard
              key={registry.key}
              code={registry.code}
              title={registry.title}
              subtitle={registry.subtitle}
              description={registry.description}
              icon={registry.icon}
              index={index + 1}
              onClick={() => onSelectRegistry(registry.route)}
            />
          ))
        ) : (
          <EmptyRegistryState />
        )}
      </Stack>
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
      groupId: PropTypes.string,
      groupCode: PropTypes.string,
      groupDescription: PropTypes.string,
      modulesCount: PropTypes.number,
      actionsCount: PropTypes.number,
      grantedActions: PropTypes.arrayOf(PropTypes.string),
    })
  ).isRequired,
  onSelectRegistry: PropTypes.func.isRequired,
};

function EmptyRegistryState() {
  return (
    <Box
      sx={{
        border: "1px solid rgba(15,23,42,0.08)",
        borderRadius: "24px",
        backgroundColor: "#ffffff",
        p: { xs: 3, sm: 4 },
        textAlign: "center",
      }}
    >
      <Typography
        sx={{
          fontFamily: "Noto Sans, sans-serif",
          fontWeight: 950,
          color: "#1f2937",
          mb: 0.8,
        }}
      >
        No hay módulos asociados
      </Typography>

      <Typography
        sx={{
          fontFamily: "Noto Sans, sans-serif",
          color: "#64748b",
          fontSize: "0.95rem",
          lineHeight: 1.6,
          maxWidth: 620,
          mx: "auto",
        }}
      >
        Tu cuenta aún no tiene grupos, módulos o acciones asignadas. Contacta a
        un administrador para solicitar los permisos correspondientes.
      </Typography>
    </Box>
  );
}