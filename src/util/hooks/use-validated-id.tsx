import { useParams } from "react-router-dom";

interface UseValidatedIdOptions {
  maxId: number; // Maximum valid id, like the count of people/planets/starships.
}

export function useValidatedId({
  maxId,
}: UseValidatedIdOptions): number | null {
  const { id } = useParams();
  const parsedId = parseInt(id as string, 10);

  if (isNaN(parsedId) || parsedId <= 0 || parsedId > maxId) {
    return null;
  }

  return parsedId;
}
