import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldError, FieldValues, Path, useForm } from "react-hook-form";
import type { TableHeader } from "../../types/table-header";
import { InputGroup } from "./entity-form-input-group";

export interface EntityFormProps<T extends FieldValues> {
  headers: TableHeader<T>[];
  onSubmit: (person: T) => void;
  validSchema: Yup.ObjectSchema<T>;
}

export function EntityForm<T extends FieldValues>({
  headers,
  onSubmit,
  validSchema,
}: EntityFormProps<T>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<T>({
    // @ts-ignore
    resolver: yupResolver(validSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {headers.map((header) => (
        <InputGroup
          key={header.key.toString()}
          label={header.label}
          inputProps={register(header.key as Path<T>)}
          error={errors[header.key] as FieldError}
        />
      ))}
      <button type="submit" className="btn btn-primary mt-2">
        Submit
      </button>
    </form>
  );
}
