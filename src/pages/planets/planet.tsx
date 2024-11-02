import * as React from "react";

import { paths } from "../../paths";
import { Navigate } from "react-router-dom";
import { useAppDispatch } from "../../state/hooks";
import { planetSchema } from "../../api/schemas";
import Loader from "../../components/loader";

import { planetHeaders } from "../../api/headers";
import { getPlanetAsync, updatePlanet } from "../../state/planets-slice";
import { usePlanets } from "../../util/hooks/use-planets";
import { useValidatedId } from "../../util/hooks/use-validated-id";
import { EntityInfo } from "../../components/entity/entity-info";
import { FormCard } from "../../components/form-card";
import { EntityForm } from "../../components/entity/entity-form";
import type { TPlanet } from "../../types/planets";

export default function Planet() {
  const { currPlanet: planet } = usePlanets();
  const planetId = useValidatedId();

  if (!planetId) {
    return <Navigate to={paths.planets} replace />;
  }

  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(getPlanetAsync(planetId as number));
  }, [planetId]);

  const onSubmit = (data: TPlanet) => {
    dispatch(updatePlanet(data));
  };

  return (
    <div className="container-fluid">
      {planet.isPending ? (
        <Loader />
      ) : (
        <div className="row g-4">
          <div className="col-md-6">
            <EntityInfo headers={planetHeaders} entity={planet} />
          </div>
          <div className="col-md-6">
            <FormCard title="Update Form">
              <EntityForm
                headers={planetHeaders}
                onSubmit={onSubmit}
                // @ts-ignore
                validSchema={planetSchema}
              />
            </FormCard>
          </div>
        </div>
      )}
    </div>
  );
}
