import * as React from "react";
import { useParams, Navigate } from "react-router-dom";
import { paths } from "../paths";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { getPersonAsync, updatePerson } from "../state/people/person-slice";
import { PersonInfo } from "../components/person-info";
import { PersonForm } from "../components/person-form";
import { usePeople } from "../util/hooks/use-people";
import Loader from "../components/loader";
import type { TPerson } from "../types/person";

export default function Person() {
  const { id } = useParams();
  const { count } = usePeople();
  const parsedId = parseInt(id as string);
  if (!parsedId || parsedId > count || parsedId < 0) {
    return <Navigate to={paths.people} replace />;
  }
  console.log(parsedId);

  const person = useAppSelector((state) => state.person);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (id) {
      dispatch(getPersonAsync(parseInt(id)));
    }
  }, [id]);

  const onSubmit = (data: TPerson) => {
    dispatch(updatePerson(data));
  };

  return (
    <div className="container-fluid">
      {person.name ? (
        <div className="row g-4">
          <div className="col-md-6">
            <PersonInfo person={person} />
          </div>
          <div className="col-md-6">
            <PersonForm onSubmit={onSubmit} />
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}
