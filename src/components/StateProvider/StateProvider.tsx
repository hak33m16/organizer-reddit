import { PaletteMode } from "@mui/material";
import React, { useEffect, useReducer } from "react";

export interface UserVisibleError {
  title: string;
  messages: string[];
}

export interface State {
  token?: string;
  username?: string;
  theme?: PaletteMode;
  error?: UserVisibleError;
}

export interface StateContext {
  state: State;
  dispatch: React.Dispatch<UpdatePayload>;
}

export interface UpdatePayload {
  key: keyof State;
  value: any;
}

export const handleUpdate = (state: State, payload: UpdatePayload) => {
  state[payload.key] = payload.value;
  return {
    ...state,
  };
};

export const StateContext = React.createContext({} as StateContext);

const initialState =
  (JSON.parse(localStorage.getItem("state") as string) as State) ||
  ({} as State);

export const StateProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(handleUpdate, initialState);

  useEffect(() => {
    localStorage.setItem("state", JSON.stringify(state));
  }, [state]);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};

export default StateProvider;
