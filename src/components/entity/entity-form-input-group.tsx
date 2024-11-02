import { FieldError, Path, UseFormRegisterReturn } from "react-hook-form";

export interface InputGroupProps<T> {
  label: string;
  inputProps: UseFormRegisterReturn<Path<T>>;
  error?: FieldError;
}

export function InputGroup<T>({
  label,
  inputProps,
  error,
}: InputGroupProps<T>) {
  return (
    <div className="mb-3">
      <div className="input-group mb-1">
        <label htmlFor={inputProps.name} className="btn btn-light text-start">
          {label}:
        </label>
        <input
          type="text"
          className="form-control"
          id={inputProps.name}
          aria-label={label}
          {...inputProps}
        />
      </div>
      {error && <span className="text-danger">{error.message}</span>}
    </div>
  );
}
