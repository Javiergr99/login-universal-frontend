import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#7A1F3D",
    },
    secondary: {
      main: "#B38E5D",
    },
    background: {
      default: "#F7F8FA",
      paper: "#FFFFFF",
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

export default theme;