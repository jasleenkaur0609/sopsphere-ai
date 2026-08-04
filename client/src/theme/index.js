import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",

    primary: {
      main: "#2563EB",
    },

    secondary: {
      main: "#7C3AED",
    },

    success: {
      main: "#16A34A",
    },

    warning: {
      main: "#F59E0B",
    },

    error: {
      main: "#DC2626",
    },

    background: {
      default: "#F5F7FB",
      paper: "#FFFFFF",
    },
  },

  typography: {
    fontFamily: [
      "Inter",
      "Segoe UI",
      "Roboto",
      "Helvetica",
      "Arial",
      "sans-serif",
    ].join(","),

    h1: {
      fontWeight: 700,
      fontSize: "2.5rem",
    },

    h2: {
      fontWeight: 700,
      fontSize: "2rem",
    },

    h3: {
      fontWeight: 600,
      fontSize: "1.75rem",
    },

    h4: {
      fontWeight: 600,
      fontSize: "1.5rem",
    },

    h5: {
      fontWeight: 600,
    },

    h6: {
      fontWeight: 600,
    },

    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },

  shape: {
    borderRadius: 12,
  },
});

export default theme;