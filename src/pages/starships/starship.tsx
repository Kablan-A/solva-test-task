import * as React from "react";

import { paths } from "../../paths";
import { Navigate } from "react-router-dom";
import { useAppDispatch } from "../../state/hooks";
import { starshipSchema } from "../../api/schemas";
import Loader from "../../components/loader";

import { getStarshipAsync, updateStarship } from "../../state/starships-slice";
import { starshipHeaders } from "../../api/headers";
import { useStarships } from "../../util/hooks/use-starships";
import { useValidatedId } from "../../util/hooks/use-validated-id";
import { EntityInfo } from "../../components/entity/entity-info";
import { FormCard } from "../../components/form-card";
import { EntityForm } from "../../components/entity/entity-form";
import type { TStarship } from "../../types/starships";

export default function Starship() {
  const { count, currStarship: starship } = useStarships();
  const starshipId = useValidatedId({ maxId: count });

  if (!starshipId) {
    return <Navigate to={paths.starships} replace />;
  }

  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(getStarshipAsync(starshipId as number));
  }, [starshipId]);

  const onSubmit = (data: TStarship) => {
    dispatch(updateStarship(data));
  };

  return (
    <div className="container-fluid">
      {starship.isPending ? (
        <Loader />
      ) : (
        <div className="row g-4">
          <div className="col-md-6">
            <EntityInfo headers={starshipHeaders} entity={starship} />
          </div>
          <div className="col-md-6">
            <FormCard title="Update Form">
              <EntityForm
                headers={starshipHeaders}
                onSubmit={onSubmit}
                validSchema={starshipSchema}
              />
            </FormCard>
          </div>
        </div>
      )}
    </div>
  );
}
