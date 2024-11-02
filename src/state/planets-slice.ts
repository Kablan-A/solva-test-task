import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { apiPaths } from "../api/api-paths";
import type { TPlanetsReq } from "../types/planets";
import type { TPlanet } from "../types/planets";

export interface PlanetState extends TPlanet {
  id: number;
  isPending: boolean;
}

const initialPlanet: PlanetState = {
  id: 1,
  name: "",
  rotation_period: "",
  orbital_period: "",
  diameter: "",
  climate: "",
  gravity: "",
  population: "",
  url: "",
  isPending: true,
};

interface PlanetsState extends TPlanetsReq {
  currPage: number;
  totalPages: number;
  currPlanet: PlanetState;
  isPending: boolean;
}
const initialPlanets: PlanetsState = {
  count: 0,
  next: "",
  previous: "",
  results: [],
  currPage: 1,
  totalPages: 0,
  currPlanet: initialPlanet,
  isPending: false,
};

export const planetSlice = createSlice({
  name: "planets",
  initialState: initialPlanets,
  reducers: {
    updateCurrPage: (state, action: PayloadAction<number>) => {
      state.currPage = action.payload;
    },
    updatePlanet: (state, action: PayloadAction<TPlanet>) => {
      const {
        rotation_period,
        orbital_period,
        diameter,
        climate,
        gravity,
        population,
      } = action.payload;
      state.currPlanet.rotation_period = rotation_period;
      state.currPlanet.orbital_period = orbital_period;
      state.currPlanet.diameter = diameter;
      state.currPlanet.climate = climate;
      state.currPlanet.gravity = gravity;
      state.currPlanet.population = population;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get planets data
      .addCase(getPlanetsAsync.pending, (state) => {
        state.isPending = true;
      })
      .addCase(getPlanetsAsync.fulfilled, (state, action) => {
        const { results, count, next, previous } = action.payload;
        state.results = results;
        state.count = count;
        state.next = next;
        state.previous = previous;
        state.totalPages = Math.ceil(count / 10);
        state.isPending = false;
      })
      .addCase(getPlanetsAsync.rejected, (state, action) => {
        console.error("Error fetching planets data:", action.error.message);
        state.isPending = false;
      })
      // Get a planet data
      .addCase(getPlanetAsync.pending, (state) => {
        state.currPlanet = initialPlanet;
      })
      .addCase(getPlanetAsync.fulfilled, (state, action) => {
        state.currPlanet = action.payload;
      })
      .addCase(getPlanetAsync.rejected, (state, action) => {
        console.error("Error fetching planet data:", action.error.message);
        state.isPending = false;
      });
  },
});

export const getPlanetsAsync = createAsyncThunk(
  "planets/getPlanetsAsync",
  async (currPage: number): Promise<TPlanetsReq> => {
    const response = await fetch(apiPaths.planets(currPage));
    if (!response.ok) {
      throw new Error("Failed to fetch planets data");
    }
    return (await response.json()) as TPlanetsReq;
  }
);

export const getPlanetAsync = createAsyncThunk(
  "planets/getPlanetAsync",
  async (id: number): Promise<PlanetState> => {
    const response = await fetch(apiPaths.planetById(id));
    const json = (await response.json()) as TPlanet;
    if (!response.ok) {
      throw new Error("Failed to fetch planet data");
    }
    return { ...json, id } as PlanetState;
  }
);

export const { updateCurrPage, updatePlanet } = planetSlice.actions;
export default planetSlice.reducer;
