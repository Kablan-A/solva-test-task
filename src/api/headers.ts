import { TPerson } from "../types/people";
import { TPlanet } from "../types/planets";
import { TStarship } from "../types/starships";
import { TableHeader } from "../types/table-header";

export const peopleHeaders: TableHeader<TPerson>[] = [
  { label: "Height", key: "height" },
  { label: "Mass", key: "mass" },
  { label: "Skin Color", key: "skin_color" },
  { label: "Birth Year", key: "birth_year" },
  { label: "Gender", key: "gender" },
];

export const planetHeaders: TableHeader<TPlanet>[] = [
  { label: "Rotation period", key: "rotation_period" },
  { label: "Orbital period", key: "orbital_period" },
  { label: "Diameter", key: "diameter" },
  { label: "Climate", key: "climate" },
  { label: "Gravity", key: "gravity" },
  { label: "Population", key: "population" },
];

export const starshipHeaders: TableHeader<TStarship>[] = [
  { label: "Name", key: "name" },
  { label: "Model", key: "model" },
  { label: "Manufacturer", key: "manufacturer" },
  { label: "Cost In Credits", key: "cost_in_credits" },
  { label: "Length", key: "length" },
  { label: "Max Atmosphering Speed", key: "max_atmosphering_speed" },
  { label: "Crew", key: "crew" },
  { label: "Starship Class", key: "starship_class" },
];
