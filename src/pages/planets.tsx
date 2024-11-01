import * as React from "react";
import Loader from "../components/loader";
import { Table } from "../components/table";
import type { TPlanet } from "../types/planet";
import { TableHeader } from "../types/table-header";
import { Pagination } from "../components/pagination/pagination";
import { usePlanets } from "../util/hooks/use-planets";
import { useAppDispatch } from "../state/hooks";
import { getPlanetsAsync, updateCurrPage } from "../state/planets-slice";

export type TPlanetsReq = {
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
  const planets = usePlanets();
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getPlanetsAsync(planets.currPage));
  }, [planets.currPage]);

  const handlePageChange = (pageNum: number): void => {
    dispatch(updateCurrPage(pageNum));
  };

  return (
    <div className="container-fluid">
      <h3>Planets</h3>

      {planets.results[0] ? (
        <>
          <Table headers={planetHeaders} data={planets.results} />
          <Pagination
            currPage={planets.currPage}
            totalPages={planets.totalPages}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}
