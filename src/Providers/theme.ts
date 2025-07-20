import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  direction: "rtl",
  palette: {
    mode: "light",
    background: {
      default: "#f5f5f5",
    },
    primary: {
      main: "#3282B8",
      dark: "#0F4C75",
      light: "#BBE1FA",
      contrastText: "#F7F7F7",
    },
    secondary: {
      main: "#526D82",
      dark: "#27374D",
      light: "#9DB2BF",
      contrastText: "#DDE6ED",
    },
  },
  typography: {
    fontFamily: "Vazirmatn, Roboto, sans-serif",
  },
  shape: {
    borderRadius: "4px",
  },
  transitions: {
    duration: {
      standard: 300,
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        size: "small",
      },
    },
    MuiTextField: {
      defaultProps: {
        size: "small",
      },
    },
    MuiFab: {
      defaultProps: {
        size: "small",
      },
    },
    MuiTable: {
      defaultProps: {
        size: "small",
      },
    },
    MuiSwitch: {
      defaultProps: {
        size: "small",
      },
    },
    MuiChip: {
      defaultProps: {
        size: "small",
      },
    },
  },
});

export default theme;

