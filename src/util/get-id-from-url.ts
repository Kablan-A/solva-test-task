import type { TPaths } from "../paths";

export function getIdFromUrl(url: string): { resource: TPaths; id: string } {
  const match = url.match(/\/(\w+)\/(\d+)\//);
  if (!match) return { resource: "home", id: "" };

  const resource = match[1] as TPaths; // e.g., "people", "planets", "starships"
  const id = match[2]; // e.g., "1", "2", "3"

  return { resource, id };
}
