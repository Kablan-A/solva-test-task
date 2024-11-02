import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { apiPaths } from "../api/api-paths";
import type { TStarshipsReq } from "../types/starships";
import type { TStarship } from "../types/starships";

export interface StarshipState extends TStarship {
  id: number;
  isPending: boolean;
}

const initialStarship: StarshipState = {
  id: 1,
  name: "",
  model: "",
  manufacturer: "",
  cost_in_credits: "",
  length: "",
  max_atmosphering_speed: "",
  crew: "",
  starship_class: "",
  url: "",
  isPending: true,
};

interface StarshipsState extends TStarshipsReq {
  currPage: number;
  totalPages: number;
  currStarship: StarshipState;
  isPending: boolean;
}
const initialStarships: StarshipsState = {
  count: 0,
  next: "",
  previous: "",
  results: [],
  currPage: 1,
  totalPages: 0,
  currStarship: initialStarship,
  isPending: false,
};

export const starshipsSlice = createSlice({
  name: "starships",
  initialState: initialStarships,
  reducers: {
    updateCurrPage: (state, action: PayloadAction<number>) => {
      state.currPage = action.payload;
    },
    updateStarship: (state, action: PayloadAction<TStarship>) => {
      const {
        model,
        manufacturer,
        cost_in_credits,
        length,
        max_atmosphering_speed,
        crew,
        starship_class,
      } = action.payload;
      state.currStarship.model = model;
      state.currStarship.manufacturer = manufacturer;
      state.currStarship.cost_in_credits = cost_in_credits;
      state.currStarship.length = length;
      state.currStarship.max_atmosphering_speed = max_atmosphering_speed;
      state.currStarship.crew = crew;
      state.currStarship.starship_class = starship_class;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get starships data
      .addCase(getStarshipsAsync.pending, (state) => {
        state.isPending = true;
      })
      .addCase(getStarshipsAsync.fulfilled, (state, action) => {
        const { results, count, next, previous } = action.payload;
        state.results = results;
        state.count = count;
        state.next = next;
        state.previous = previous;
        state.totalPages = Math.ceil(count / 10);
        state.isPending = false;
      })
      .addCase(getStarshipsAsync.rejected, (state, action) => {
        console.error("Error fetching starships data:", action.error.message);
        state.isPending = false;
      })
      // Get a starship data
      .addCase(getStarshipAsync.pending, (state) => {
        state.currStarship = initialStarship;
      })
      .addCase(getStarshipAsync.fulfilled, (state, action) => {
        state.currStarship = action.payload;
      })
      .addCase(getStarshipAsync.rejected, (state, action) => {
        console.error("Error fetching starship data:", action.error.message);
        state.isPending = false;
      });
  },
});

export const getStarshipsAsync = createAsyncThunk(
  "starships/getStarshipsAsync",
  async (currPage: number): Promise<TStarshipsReq> => {
    const response = await fetch(apiPaths.starships(currPage));
    if (!response.ok) {
      throw new Error("Failed to fetch starships data");
    }
    return (await response.json()) as TStarshipsReq;
  }
);

export const getStarshipAsync = createAsyncThunk(
  "starships/getStarshipAsync",
  async (id: number): Promise<StarshipState> => {
    const response = await fetch(apiPaths.starshipById(id));
    const json = (await response.json()) as TStarship;
    if (!response.ok) {
      throw new Error("Failed to fetch starship data");
    }
    return { ...json, id } as StarshipState;
  }
);

export const { updateCurrPage, updateStarship } = starshipsSlice.actions;
export default starshipsSlice.reducer;
