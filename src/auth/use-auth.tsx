import { useAppSelector } from "../state/hooks";

export function useAuth() {
  return useAppSelector((state) => state.auth);
}
