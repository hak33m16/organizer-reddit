import {
  createTheme,
  CssBaseline,
  PaletteMode,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";
import React, { useContext, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Authorization from "../Authorization";
import Home from "../Home";
import Organizer from "../Organizer";

interface State {
  token?: string;
  username?: string;
  theme?: PaletteMode;
}

export const StateContext = React.createContext({} as State);
const StateProvider = StateContext.Provider;

function App() {
  return (
    <StateProvider value={{}}>
      <ThemeProvider
        theme={createTheme({
          palette: {
            mode: useMediaQuery("(prefers-color-scheme: dark)")
              ? "dark"
              : "light",
          },
        })}
      >
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/authorization" element={<Authorization />} />
            <Route path="/organizer" element={<Organizer />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </StateProvider>
  );
}

export default App;
