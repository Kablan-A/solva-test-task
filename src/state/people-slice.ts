import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { apiPaths } from "../api/api-paths";
import type { TPeopleReq } from "../pages/people/people";
import type { TPerson } from "../types/person";

export interface PersonState extends TPerson {
  id: number;
  isPending: boolean;
}
const initialPerson: PersonState = {
  id: 1,
  name: "",
  height: "",
  mass: "",
  hair_color: "",
  skin_color: "",
  birth_year: "",
  gender: "",
  url: "",
  isPending: true,
};

interface PeopleState extends TPeopleReq {
  currPage: number;
  totalPages: number;
  currPerson: PersonState;
  isPending: boolean;
}
const initialPeople: PeopleState = {
  count: 0,
  next: "",
  previous: "",
  results: [],
  currPage: 1,
  totalPages: 0,
  currPerson: initialPerson,
  isPending: false,
};

export const peopleSlice = createSlice({
  name: "people",
  initialState: initialPeople,
  reducers: {
    updateCurrPage: (state, action: PayloadAction<number>) => {
      state.currPage = action.payload;
    },
    updatePerson: (state, action: PayloadAction<TPerson>) => {
      state.currPerson.height = action.payload.height;
      state.currPerson.mass = action.payload.mass;
      state.currPerson.hair_color = action.payload.hair_color;
      state.currPerson.skin_color = action.payload.skin_color;
      state.currPerson.birth_year = action.payload.birth_year;
      state.currPerson.gender = action.payload.gender;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get people data
      .addCase(getPeopleAsync.pending, (state) => {
        state.isPending = true;
      })
      .addCase(getPeopleAsync.fulfilled, (state, action) => {
        const { results, count, next, previous } = action.payload;
        state.results = results;
        state.count = count;
        state.next = next;
        state.previous = previous;
        state.totalPages = Math.ceil(count / 10);
        state.isPending = false;
      })
      .addCase(getPeopleAsync.rejected, (state, action) => {
        console.error("Error fetching people data:", action.error.message);
        state.isPending = false;
      })
      // Get a person data
      .addCase(getPersonAsync.pending, (state) => {
        state.currPerson = initialPerson;
      })
      .addCase(getPersonAsync.fulfilled, (state, action) => {
        state.currPerson = action.payload;
      })
      .addCase(getPersonAsync.rejected, (state, action) => {
        console.error("Error fetching person data:", action.error.message);
        state.isPending = false;
      });
  },
});

export const getPeopleAsync = createAsyncThunk(
  "people/getPeopleAsync",
  async (currPage: number = 1): Promise<TPeopleReq> => {
    const response = await fetch(apiPaths.people(currPage));
    if (!response.ok) {
      throw new Error("Failed to fetch people data");
    }
    return (await response.json()) as TPeopleReq;
  }
);

export const getPersonAsync = createAsyncThunk(
  "people/getPersonAsync",
  async (id: number = 1): Promise<PersonState> => {
    const response = await fetch(apiPaths.personById(id));
    const json = (await response.json()) as TPerson;
    if (!response.ok) {
      throw new Error("Failed to fetch person data");
    }
    return { ...json, id } as PersonState;
  }
);

export const { updateCurrPage, updatePerson } = peopleSlice.actions;
export default peopleSlice.reducer;
