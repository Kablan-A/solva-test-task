export type TStarship = {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string | number;
  length: string | number;
  max_atmosphering_speed: string | number;
  crew: string | number;
  passengers: string | number;
  cargo_capacity: string | number;
  consumables: string;
  hyperdrive_rating: string | number;
  MGLT: string | number;
  starship_class: string;
  pilots: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
};