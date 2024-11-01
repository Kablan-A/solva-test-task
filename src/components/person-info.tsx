import { peopleHeaders } from "../pages/people";
import type { TPerson } from "../types/person";

export interface PersonInfoProps {
  person: TPerson;
}

export function PersonInfo({ person }: PersonInfoProps) {
  return (
    <section>
      <h2 className="fw-normal mb-4">{person.name}</h2>
      {peopleHeaders.map((header, index) => (
        <p key={`${header.key}${index}`} className="lead fw-light">
          <strong>{header.label}:</strong> {person[header.key]}
        </p>
      ))}
    </section>
  );
}
