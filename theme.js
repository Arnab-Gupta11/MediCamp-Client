import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    descColor: { main: "#B1B1B1" },
    primary: { main: "#FF5253" },
    secondary: { main: "#00122A" },
    primaryBg: { main: "#F8F8FB" },
  },
  typography: {
    fontFamily: ["Lora", "serif"].join(","),
  },
});
const descColor = theme.palette.descColor.main;
const primaryBg = theme.palette.primaryBg.main;
export { theme, descColor, primaryBg };
