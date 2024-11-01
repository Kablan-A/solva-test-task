import { useAppSelector } from "../../state/hooks";

export function usePlanets() {
  return useAppSelector((state) => state.planets);
}
