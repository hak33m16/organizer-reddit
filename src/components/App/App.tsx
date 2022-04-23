import {
  createTheme,
  CssBaseline,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../Home";

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  return (
    <ThemeProvider
      theme={createTheme({
        palette: { mode: prefersDarkMode ? "dark" : "light" },
      })}
    >
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
