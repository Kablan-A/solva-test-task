import * as React from "react";
import Loader from "../components/loader";
import { Table } from "../components/table";
import type { TPerson } from "../types/person";
import type { TableHeader } from "../types/table-header";

type TPeopleReq = {
  count: number;
  next: string | null;
  previous: string | null;
  results: TPerson[];
};

const peopleHeaders: TableHeader<TPerson>[] = [
  { label: "Height", key: "height" },
  { label: "Mass", key: "mass" },
  { label: "Skin Color", key: "skin_color" },
  { label: "Birth Year", key: "birth_year" },
  { label: "Gender", key: "gender" },
];

export default function PeoplePage() {
  const [people, setPeople] = React.useState<TPeopleReq>();

  React.useEffect(() => {
    const getPeople = async () => {
      const response = await fetch("https://swapi.dev/api/people");
      const json = await response.json();
      setPeople(json);
    };
    getPeople();
  }, []);

  return (
    <div className="container-fluid">
      <h3>People</h3>

      {people ? (
        <Table headers={peopleHeaders} data={people.results} />
      ) : (
        <Loader />
      )}
    </div>
  );
}
