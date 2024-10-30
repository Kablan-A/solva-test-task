import { AuthStatus } from "../auth/components/auth-status";
import ProtectedPage from "./protected";

export default function Layout() {
  return (
    <>
      <AuthStatus />
      <ProtectedPage />
    </>
  );
}
