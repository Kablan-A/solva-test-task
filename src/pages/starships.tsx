import * as React from "react";
import Loader from "../components/loader";
import { Table } from "../components/table";
import type { TStarship } from "../types/starship";
import type { TableHeader } from "../types/table-header";

const starshipHeaders: TableHeader<TStarship>[] = [
  { label: "Name", key: "name" },
  { label: "Model", key: "model" },
  { label: "Manufacturer", key: "manufacturer" },
  { label: "Cost In Credits", key: "cost_in_credits" },
  { label: "Length", key: "length" },
  { label: "Crew", key: "crew" },
];

type TStarshipsReq = {
  count: number;
  next: string | null;
  previous: string | null;
  results: TStarship[];
};

export default function PlanetsPage() {
  const [starships, setStarships] = React.useState<TStarshipsReq>();

  React.useEffect(() => {
    const getStarships = async () => {
      const response = await fetch("https://swapi.dev/api/starships");
      const json = await response.json();
      setStarships(json);
    };
    getStarships();
  }, []);

  return (
    <div className="container-fluid">
      <h3>Starships</h3>

      {starships ? (
        <Table headers={starshipHeaders} data={starships.results} />
      ) : (
        <Loader />
      )}
    </div>
  );
}
