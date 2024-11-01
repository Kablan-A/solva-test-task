import { useForm } from "react-hook-form";
import { peopleHeaders } from "../pages/people";
import { PersonState } from "../state/people/person-slice";
import type { TPerson } from "../types/person";

export interface PersonFormProps {
  onSubmit: (person: TPerson) => void;
}

export function PersonForm({ onSubmit }: PersonFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonState>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3 className="fw-normal mb-4">Update Form</h3>
      {peopleHeaders.map((header, index) => (
        <div key={`${header.key}${index}`} className="mb-3">
          <label htmlFor={header.key} className="form-label">
            {header.label}
          </label>
          <input
            type="text"
            className="form-control"
            id={header.key}
            {...register(header.key)}
          />
          {errors[header.key] && (
            <span className="text-danger">{errors[header.key]?.message}</span>
          )}
        </div>
      ))}
      <button type="submit" className="btn btn-primary mt-2">
        Submit
      </button>
    </form>
  );
}
