import * as React from "react";
import Loader from "../../components/loader";
import { Table } from "../../components/table";
import { Pagination } from "../../components/pagination/pagination";
import { useStarships } from "../../util/hooks/use-starships";
import { useAppDispatch } from "../../state/hooks";
import { getStarshipsAsync, updateCurrPage } from "../../state/starships-slice";
import { starshipHeaders } from "../../api/headers";

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
