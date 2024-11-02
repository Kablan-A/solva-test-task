import { useParams } from "react-router-dom";

export function useValidatedId(): number | null {
  const { id } = useParams();
  const parsedId = parseInt(id as string, 10);

  if (isNaN(parsedId) || parsedId <= 0) {
    return null;
  }

  return parsedId;
}
