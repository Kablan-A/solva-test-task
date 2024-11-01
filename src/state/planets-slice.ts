import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { TPlanetsReq } from "../pages/planets";

interface PlanetsState extends TPlanetsReq {
  currPage: number;
  totalPages: number;
}

const initialState: PlanetsState = {
  count: 0,
  next: "",
  previous: "",
  results: [],
  currPage: 1,
  totalPages: 0,
};

export const planetsSlice = createSlice({
  name: "planets",
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
      .addCase(getPlanetsAsync.pending, (_) => {
        console.log("getPlanetsAsync.pending");
      })
      .addCase(getPlanetsAsync.fulfilled, (state, action) => {
        state.results = action.payload.results;
        state.count = action.payload.count;
        state.next = action.payload.next;
        state.previous = action.payload.previous;
        state.totalPages = Math.ceil(action.payload.count / 10);
      });
  },
});

export const getPlanetsAsync = createAsyncThunk(
  "planets/getPlanetsAsync",
  async (currPage: number = 1): Promise<TPlanetsReq> => {
    try {
      const url = `https://swapi.dev/api/planets/?page=${currPage}`;
      const response = await fetch(url);
      return (await response.json()) as TPlanetsReq;
    } catch (error) {
      return initialState;
    }
  }
);

export const { updateCurrPage } = planetsSlice.actions;
export default planetsSlice.reducer;
