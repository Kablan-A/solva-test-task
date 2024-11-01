import { useAppSelector } from "../../state/hooks";

export function useStarships() {
  return useAppSelector((state) => state.starships);
}
