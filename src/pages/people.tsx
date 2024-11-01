import * as React from "react";
import Loader from "../components/loader";
import { Table } from "../components/table";
import { Pagination } from "../components/pagination/pagination";
import { usePeople } from "../util/hooks/use-people";
import { useAppDispatch } from "../state/hooks";
import { getPeopleAsync } from "../state/people/people-slice";
import { updateCurrPage } from "../state/people/people-slice";
import type { TPerson } from "../types/person";
import type { TableHeader } from "../types/table-header";

export type TPeopleReq = {
  count: number;
  next: string | null;
  previous: string | null;
  results: TPerson[];
};

export const peopleHeaders: TableHeader<TPerson>[] = [
  { label: "Height", key: "height" },
  { label: "Mass", key: "mass" },
  { label: "Skin Color", key: "skin_color" },
  { label: "Birth Year", key: "birth_year" },
  { label: "Gender", key: "gender" },
];

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

      {people.results[0] ? (
        <>
          <Table headers={peopleHeaders} data={people.results} />
          <Pagination
            currPage={people.currPage}
            totalPages={people.totalPages}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}
