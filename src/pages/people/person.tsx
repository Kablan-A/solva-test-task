import * as React from "react";
import { paths } from "../../paths";
import { Navigate } from "react-router-dom";
import { useAppDispatch } from "../../state/hooks";
import { personSchema } from "../../api/schemas";
import Loader from "../../components/loader";
import { peopleHeaders } from "../../api/headers";
import { getPersonAsync, updatePerson } from "../../state/people-slice";
import { usePeople } from "../../util/hooks/use-people";
import { useValidatedId } from "../../util/hooks/use-validated-id";
import { EntityInfo } from "../../components/entity/entity-info";
import { FormCard } from "../../components/form-card";
import { EntityForm } from "../../components/entity/entity-form";
import type { TPerson } from "../../types/people";

export default function Person() {
  const { currPerson: person } = usePeople();
  const personId = useValidatedId();

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
            <EntityInfo headers={peopleHeaders} entity={person} />
          </div>
          <div className="col-md-6">
            <FormCard title="Update Form">
              <EntityForm
                headers={peopleHeaders}
                onSubmit={onSubmit}
                // @ts-ignore
                validSchema={personSchema}
              />
            </FormCard>
          </div>
        </div>
      )}
    </div>
  );
}
