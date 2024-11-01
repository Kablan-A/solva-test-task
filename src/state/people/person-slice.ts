import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { TPerson } from "../../types/person";

export interface PersonState extends TPerson {
  id: number;
}

const initialState: PersonState = {
  id: 1,
  name: "",
  height: "",
  mass: "",
  hair_color: "",
  skin_color: "",
  birth_year: "",
  gender: "",
  url: "",
};

export const personSlice = createSlice({
  name: "person",
  initialState,
  reducers: {
    updatePerson: (state, action: PayloadAction<TPerson>) => {
      state.height = action.payload.height;
      state.mass = action.payload.mass;
      state.hair_color = action.payload.hair_color;
      state.skin_color = action.payload.skin_color;
      state.birth_year = action.payload.birth_year;
      state.gender = action.payload.gender;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPersonAsync.pending, (state) => {
        state.name = initialState.name;
        console.log("getPersonAsync.pending");
      })
      .addCase(getPersonAsync.fulfilled, (state, action) => {
        state.id = action.payload.id;
        state.name = action.payload.name;
        state.height = action.payload.height;
        state.mass = action.payload.mass;
        state.hair_color = action.payload.hair_color;
        state.skin_color = action.payload.skin_color;
        state.birth_year = action.payload.birth_year;
        state.gender = action.payload.gender;
      });
  },
});

export const getPersonAsync = createAsyncThunk(
  "person/getPersonAsync",
  async (id: number): Promise<PersonState> => {
    try {
      const url = `https://swapi.dev/api/people/${id}`;
      const response = await fetch(url);
      const json = (await response.json()) as TPerson;
      return { id, ...json } as PersonState;
    } catch (error) {
      console.log(error);
      return initialState;
    }
  }
);

export const { updatePerson } = personSlice.actions;
export default personSlice.reducer;
