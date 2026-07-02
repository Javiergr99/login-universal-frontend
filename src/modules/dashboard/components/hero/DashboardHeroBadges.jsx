import { Chip, Stack } from "@mui/material";

import VerifiedUserRoundedIcon from "@mui/icons-material/VerifiedUserRounded";

export default function DashboardHeroBadges() {
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1}
      sx={{
        mb: 1.6,
        flexWrap: "wrap",
        rowGap: 1,
      }}
    >
      <Chip
        icon={<VerifiedUserRoundedIcon />}
        label="Acceso verificado"
        sx={{
          height: 34,
          borderRadius: 999,
          color: "#8f1538",
          backgroundColor: "rgba(159,34,65,0.08)",
          border: "1px solid rgba(159,34,65,0.12)",
          fontFamily: "Noto Sans, sans-serif",
          fontWeight: 900,
          "& .MuiChip-icon": {
            color: "#8f1538",
          },
        }}
      />
    </Stack>
  );
}