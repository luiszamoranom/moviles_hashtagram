import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#914DF0",
      secondary: "#000AFF"
    },
    secondary: {
      main: "#656565"
    },
    mode: 'light' // Aquí se puede cambiar a dark para tener modo oscuro
  }
})