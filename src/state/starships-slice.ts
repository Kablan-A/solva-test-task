import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { TStarshipsReq } from "../pages/starships";

interface StarshipsState extends TStarshipsReq {
  currPage: number;
  totalPages: number;
}

const initialState: StarshipsState = {
  count: 0,
  next: "",
  previous: "",
  results: [],
  currPage: 1,
  totalPages: 0,
};

export const starshipsSlice = createSlice({
  name: "starships",
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
      .addCase(getStarshipsAsync.pending, (_) => {
        console.log("getStarshipsAsync.pending");
      })
      .addCase(getStarshipsAsync.fulfilled, (state, action) => {
        state.results = action.payload.results;
        state.count = action.payload.count;
        state.next = action.payload.next;
        state.previous = action.payload.previous;
        state.totalPages = Math.ceil(action.payload.count / 10);
      });
  },
});

export const getStarshipsAsync = createAsyncThunk(
  "starships/getStarshipsAsync",
  async (currPage: number = 1): Promise<TStarshipsReq> => {
    try {
      const url = `https://swapi.dev/api/starships/?page=${currPage}`;
      const response = await fetch(url);
      return (await response.json()) as TStarshipsReq;
    } catch (error) {
      return initialState;
    }
  }
);

export const { updateCurrPage } = starshipsSlice.actions;
export default starshipsSlice.reducer;
