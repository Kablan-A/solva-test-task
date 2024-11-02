import type { TableHeader } from "../types/table-header";

export interface EntityInfoProps<T> {
  headers: TableHeader<T>[];
  entity: T;
}

export function EntityInfo<T extends { name: string }>({
  headers,
  entity,
}: EntityInfoProps<T>) {
  return (
    <section>
      <h2 className="fw-normal mb-4">{entity.name}</h2>
      {headers.map((header, index) => (
        <p key={`${String(header.key)}${index}`} className="lead fw-light">
          <strong>{header.label}:</strong>{" "}
          {entity[header.key] as React.ReactNode}
        </p>
      ))}
    </section>
  );
}
