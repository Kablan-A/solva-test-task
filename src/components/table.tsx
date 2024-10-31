import * as React from "react";
import { Link } from "react-router-dom";
import { getIdFromUrl } from "../util/get-id-from-url";
import { paths } from "../paths";
import type { TableHeader } from "../types/table-header";

export interface TableProps<T> {
  headers: TableHeader<T>[];
  data: T[];
}

export function Table<T extends { url: string; name: string }>({
  headers,
  data,
}: TableProps<T>): React.JSX.Element {
  console.log(data);
  return (
    <div className="table-responsive">
      <table className="table table-sm table-hover align-middle">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            {headers.map((header) => (
              <th scope="col" key={header.key as string}>
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="table-group-divide">
          {data.map((item) => {
            // Get the ID from the URL and construct the person's path.
            const { resource, id } = getIdFromUrl(item.url);
            const itemPath = `${paths[resource]}/${id}`;

            return (
              <tr key={`tableItem${id}`}>
                <td scope="row">{id}</td>
                <td>
                  <Link to={itemPath}>{item.name}</Link>
                </td>
                {headers.map((header) => (
                  <td key={header.key as string}>
                    {item[header.key] as React.ReactNode}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
