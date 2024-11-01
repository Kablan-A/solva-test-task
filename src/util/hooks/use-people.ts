import { useAppSelector } from "../../state/hooks";

export function usePeople() {
  return useAppSelector((state) => state.people);
}
