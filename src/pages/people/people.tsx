import * as React from "react";
import Loader from "../../components/loader";
import { Table } from "../../components/table";
import { Pagination } from "../../components/pagination/pagination";
import { peopleHeaders } from "../../api/headers";
import { usePeople } from "../../util/hooks/use-people";
import { useAppDispatch } from "../../state/hooks";
import { getPeopleAsync } from "../../state/people-slice";
import { updateCurrPage } from "../../state/people-slice";

export default function PeoplePage() {
  const people = usePeople();
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getPeopleAsync(people.currPage));
  }, [people.currPage]);

  const handlePageChange = (pageNum: number): void => {
    dispatch(updateCurrPage(pageNum));
  };

  return (
    <div className="container-fluid">
      <h3>People</h3>

      {people.isPending ? (
        <Loader />
      ) : (
        <>
          <Table headers={peopleHeaders} data={people.results} />
          <Pagination
            currPage={people.currPage}
            totalPages={people.totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}
