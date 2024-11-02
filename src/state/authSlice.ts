import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { TUser } from "../types/user";

interface AuthState {
  isSignedIn: boolean;
  username: string | null;
  password: string | null;
  remember: boolean;
}

const initialState: AuthState = {
  isSignedIn: false,
  username: null,
  password: null,
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
      state.username = null;
      state.password = null;
      localStorage.removeItem("authState");
    },
    updateUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    updatePassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    updateRemember: (state, action: PayloadAction<boolean>) => {
      state.remember = action.payload;
    },
  },
});

export const {
  signIn,
  signOut,
  updateUsername,
  updatePassword,
  updateRemember,
} = authSlice.actions;
export default authSlice.reducer;
