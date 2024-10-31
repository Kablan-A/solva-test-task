import * as React from "react";
import Loader from "../components/loader";
import { Table } from "../components/table";
import type { TPlanet } from "../types/planet";
import { TableHeader } from "../types/table-header";

type TPlanetsReq = {
  count: number;
  next: string | null;
  previous: string | null;
  results: TPlanet[];
};

const planetHeaders: TableHeader<TPlanet>[] = [
  { label: "Name", key: "name" },
  { label: "Diameter", key: "diameter" },
  { label: "Climate", key: "climate" },
];

export default function PlanetsPage() {
  const [planets, setPlanets] = React.useState<TPlanetsReq>();

  React.useEffect(() => {
    const getPlanets = async () => {
      const response = await fetch("https://swapi.dev/api/planets");
      const json = await response.json();
      setPlanets(json);
    };
    getPlanets();
  }, []);

  return (
    <div className="container-fluid">
      <h3>Planets</h3>

      {planets ? (
        <Table headers={planetHeaders} data={planets.results} />
      ) : (
        <Loader />
      )}
    </div>
  );
}
