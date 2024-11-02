import * as React from "react";
import { paths } from "../../paths";
import { useAppDispatch } from "../../state/hooks";
import { getPersonAsync, updatePerson } from "../../state/people-slice";
import { PersonInfo } from "../../components/person-info";
import { PersonForm } from "../../components/person-form";
import { usePeople } from "../../util/hooks/use-people";
import { useValidatedId } from "../../util/hooks/use-validated-id";
import Loader from "../../components/loader";
import type { TPerson } from "../../types/person";
import { Navigate } from "react-router-dom";

export default function Person() {
  const { count, currPerson: person } = usePeople();
  const personId = useValidatedId({ maxId: count });

  if (!personId) {
    return <Navigate to={paths.people} replace />;
  }

  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(getPersonAsync(personId as number));
  }, [personId]);

  const onSubmit = (data: TPerson) => {
    dispatch(updatePerson(data));
  };

  return (
    <div className="container-fluid">
      {person.isPending ? (
        <Loader />
      ) : (
        <div className="row g-4">
          <div className="col-md-6">
            <PersonInfo person={person} />
          </div>
          <div className="col-md-6">
            <PersonForm onSubmit={onSubmit} />
          </div>
        </div>
      )}
    </div>
  );
}
