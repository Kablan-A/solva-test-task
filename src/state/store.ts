import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import peopleSlice from "./people/people-slice";
import personSlice from "./people/person-slice";
import planetsSlice from "./planets-slice";
import starshipsSlice from "./starships-slice";

export const store = configureStore({
  // reducer - functions that change the store state
  reducer: {
    auth: authReducer,
    people: peopleSlice,
    person: personSlice,
    planets: planetsSlice,
    starships: starshipsSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {users: UsersState}
export type AppDispatch = typeof store.dispatch;
