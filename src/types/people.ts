export type TPerson = {
  name: string;
  height: string;
  gender: string;
  mass: string;
  skin_color: string;
  birth_year: string;
  url: string;
  // Unused
  species?: string[];
  created?: string;
  edited?: string;
  eye_color?: string;
  films?: string[];
  hair_color?: string;
  homeworld?: string;
  starships?: string[];
  vehicles?: string[];
};

export type TPeopleReq = {
  count: number;
  next: string | null;
  previous: string | null;
  results: TPerson[];
};
