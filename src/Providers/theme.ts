import { colors } from "@mui/material";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  direction: "rtl",
  palette: {
    mode: "light",
    background: {
      default: "#f5f5f5",
    },
    primary: {
      main: colors.orange[300],
      light: colors.orange[100],
    },
    secondary: {
      main: "#526D82",
      dark: "#27374D",
      light: "#9DB2BF",
      contrastText: "#DDE6ED",
    },
    success: {
      light: "#93DA97",
      main: "#4CAF50",
      dark: "#388E3C",
      contrastText: "#FFFFFF",
    },
    error: {
      light: "#FFB4B4",
      main: "#F44336",
      dark: "#D32F2F",
      contrastText: "#FFFFFF",
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
