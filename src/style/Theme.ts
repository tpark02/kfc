import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    navbar: {
      main: string;
    };
  }
  interface PaletteOptions {
    navbar?: {
      main: string;
    };
  }
}

const steamTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#171a21",
      paper: "#2a2e35",
    },
    primary: {
      main: "#00adee",
      contrastText: "#ffffff",
    },
    text: {
      primary: "#ffffff",
      secondary: "#c7d5e0",
    },
    navbar: {
      main: "#1b2838",
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-root": {
            backgroundColor: "#1b1f26",
            color: "#fff",
            borderRadius: 4,
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#363c45",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#4a90e2",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#00adee",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          background: "linear-gradient(to right, #0078a0, #005a9c)",
          border: "1px solid #555",
          color: "#fff",
          "&:hover": {
            background: "linear-gradient(to right, #0088bb, #0066b2)",
            borderColor: "#aaa",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#c7d5e0",
          "&.Mui-focused": {
            color: "#00adee",
          },
        },
      },
    },
  },
});

export default steamTheme;
