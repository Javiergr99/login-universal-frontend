import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import logosSndif from "../../../assets/logos/Logos-SNDIF.png";

export default function PublicHeader() {
  const navigate = useNavigate();

  const handleGoToLogin = () => {
    navigate("/login");
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "#f3f3f3",
        borderBottom: "1px solid #e3e3e3",
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          minHeight: { xs: 60, sm: 72, md: 78 },
          px: { xs: 1.25, sm: 2.5, md: 4, lg: 6 },
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: { xs: 0.75, sm: 1.5, md: 2 },
          "@media (max-width:359px)": {
            px: 1,
            gap: 0.5,
            minHeight: 58,
          },
        }}
      >
        {/* LOGOS */}
        <Box
          component="img"
          src={logosSndif}
          alt="Gobierno de México, Salud y SNDIF"
          sx={{
            width: { xs: 96, sm: 150, md: 250, lg: 308 },
            height: "auto",
            display: "block",
            flexShrink: 0,
            "@media (max-width:359px)": {
              width: 88,
            },
          }}
        />

        {/* MENÚ DERECHO */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 0.75, sm: 1.5, md: 2.5, lg: 4 },
            ml: "auto",
            minWidth: 0,
            "@media (max-width:359px)": {
              gap: 0.45,
            },
          }}
        >
          {/* ACCEDER A REGISTROS */}
          <Box
            component="button"
            type="button"
            onClick={handleGoToLogin}
            sx={{
              border: "none",
              background: "transparent",
              p: 0,
              m: 0,
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              fontFamily: '"Noto Sans", sans-serif',
              color: "#6f1235",
              minWidth: 0,
            }}
          >
            <Typography
              sx={{
                fontFamily: '"Noto Sans", sans-serif',
                fontSize: { xs: "0.66rem", sm: "0.82rem", md: "0.95rem" },
                fontWeight: 700,
                color: "#6f1235",
                lineHeight: { xs: 1.02, md: 1 },
                textAlign: "right",
                whiteSpace: { xs: "normal", md: "nowrap" },
                "@media (max-width:359px)": {
                  fontSize: "0.62rem",
                },
              }}
            >
              Acceder a Registros
            </Typography>
          </Box>

          {/* GOBIERNO */}
          <Typography
            sx={{
              display: { xs: "none", lg: "block" },
              fontFamily: '"Noto Sans", sans-serif',
              fontSize: "15px",
              fontWeight: 700,
              color: "#6f1235",
              lineHeight: 1,
              cursor: "pointer",
              userSelect: "none",
            }}
          >
            Gobierno
          </Typography>

          {/* TRÁMITES */}
          <Typography
            sx={{
              display: { xs: "none", lg: "block" },
              fontFamily: '"Noto Sans", sans-serif',
              fontSize: "15px",
              fontWeight: 700,
              color: "#6f1235",
              lineHeight: 1,
              cursor: "pointer",
              userSelect: "none",
            }}
          >
            Trámites
          </Typography>

          {/* BUSCADOR */}
          <Box
            sx={{
              width: { xs: 46, sm: 68, md: 108, lg: 160 },
              height: { xs: 34, sm: 40, md: 42, lg: 44 },
              border: "1.5px solid #a85d73",
              borderRadius: "4px",
              backgroundColor: "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              pr: { xs: 0.6, sm: 0.85, md: 1.05, lg: 1.25 },
              boxSizing: "border-box",
              flexShrink: 0,
              "@media (max-width:359px)": {
                width: 42,
                height: 32,
                pr: 0.45,
              },
            }}
          >
            <SearchOutlinedIcon
              sx={{
                fontSize: { xs: 18, sm: 22, md: 26, lg: 31 },
                color: "#7a1237",
                strokeWidth: 1.4,
                "@media (max-width:359px)": {
                  fontSize: 17,
                },
              }}
            />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}