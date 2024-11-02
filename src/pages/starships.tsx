import * as React from "react";
import Loader from "../components/loader";
import { Table } from "../components/table";
import { Pagination } from "../components/pagination/pagination";
import type { TStarship } from "../types/starship";
import type { TableHeader } from "../types/table-header";
import { useStarships } from "../util/hooks/use-starships";
import { useAppDispatch } from "../state/hooks";
import { getStarshipsAsync, updateCurrPage } from "../state/starships-slice";

const starshipHeaders: TableHeader<TStarship>[] = [
  { label: "Name", key: "name" },
  { label: "Model", key: "model" },
  { label: "Manufacturer", key: "manufacturer" },
  { label: "Cost In Credits", key: "cost_in_credits" },
  { label: "Length", key: "length" },
  { label: "Crew", key: "crew" },
];

export type TStarshipsReq = {
  count: number;
  next: string | null;
  previous: string | null;
  results: TStarship[];
};

export default function PlanetsPage() {
  const starships = useStarships();
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getStarshipsAsync(starships.currPage));
  }, [starships.currPage]);

  const handlePageChange = (pageNum: number): void => {
    dispatch(updateCurrPage(pageNum));
  };

  return (
    <div className="container-fluid">
      <h3>Starships</h3>

      {starships.results[0] ? (
        <>
          <Table headers={starshipHeaders} data={starships.results} />
          <Pagination
            currPage={starships.currPage}
            totalPages={starships.totalPages}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}
