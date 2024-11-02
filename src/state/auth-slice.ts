import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { TUser } from "../types/user";

interface AuthState extends TUser {
  isSignedIn: boolean;
}

const initialState: AuthState = {
  isSignedIn: false,
  username: "",
  password: "",
  remember: true,
};

// Helper to persist state in local storage
const persistAuthState = (state: AuthState) => {
  localStorage.setItem("authState", JSON.stringify(state));
};

// Helper to load state from local storage
const loadAuthState = (): AuthState => {
  const storedState = localStorage.getItem("authState");
  return storedState ? JSON.parse(storedState) : initialState;
};

export const authSlice = createSlice({
  name: "auth",
  initialState: loadAuthState(),
  reducers: {
    signIn: (state, action: PayloadAction<TUser>) => {
      state.isSignedIn = true;
      state.username = action.payload.username;
      state.password = action.payload.password;

      if (action.payload.remember) {
        persistAuthState(state);
      }
    },
    signOut: (state) => {
      state.isSignedIn = false;
      state.username = "";
      state.password = "";
      localStorage.removeItem("authState");
    },
  },
});

export const { signIn, signOut } = authSlice.actions;
export default authSlice.reducer;
