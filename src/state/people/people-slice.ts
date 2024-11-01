import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { TPeopleReq } from "../../pages/people";

interface PeopleState extends TPeopleReq {
  currPage: number;
  totalPages: number;
}

const initialState: PeopleState = {
  count: 0,
  next: "",
  previous: "",
  results: [],
  currPage: 1,
  totalPages: 0,
};

export const peopleSlice = createSlice({
  name: "people",
  initialState,
  reducers: {
    updateCurrPage: (state, action: PayloadAction<number>) => {
      state.currPage = action.payload;
    },
    updateTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPeopleAsync.pending, (_) => {
        console.log("getPeopleAsync.pending");
      })
      .addCase(getPeopleAsync.fulfilled, (state, action) => {
        state.results = action.payload.results;
        state.count = action.payload.count;
        state.next = action.payload.next;
        state.previous = action.payload.previous;
        state.totalPages = Math.ceil(action.payload.count / 10);
      });
  },
});

export const getPeopleAsync = createAsyncThunk(
  "people/getPeopleAsync",
  async (currPage: number = 1): Promise<TPeopleReq> => {
    try {
      const url = `https://swapi.dev/api/people/?page=${currPage}`;
      const response = await fetch(url);
      return (await response.json()) as TPeopleReq;
    } catch (error) {
      return initialState;
    }
  }
);

export const { updateCurrPage } = peopleSlice.actions;
export default peopleSlice.reducer;
