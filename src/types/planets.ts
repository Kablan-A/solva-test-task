export type TPlanet = {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  population: string;
  url: string;
  terrain?: string;
  surface_water?: string;
  residents?: string[];
  films?: string[];
  created?: string;
  edited?: string;
};

export type TPlanetsReq = {
  count: number;
  next: string | null;
  previous: string | null;
  results: TPlanet[];
};
