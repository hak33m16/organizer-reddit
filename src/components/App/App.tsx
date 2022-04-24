import {
  createTheme,
  CssBaseline,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Authorization from "../Authorization";
import Home from "../Home";

interface State {
  token?: string;
}

export const StateContext = React.createContext({} as State);
const StateProvider = StateContext.Provider;

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  return (
    <ThemeProvider
      theme={createTheme({
        palette: { mode: prefersDarkMode ? "dark" : "light" },
      })}
    >
      <CssBaseline />
      <StateProvider value={{}}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/authorization" element={<Authorization />} />
          </Routes>
        </BrowserRouter>
      </StateProvider>
    </ThemeProvider>
  );
}

export default App;
