import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../use-auth";

export interface RequireAuthProps {
  children: JSX.Element;
}
export function RequireAuth({ children }: RequireAuthProps) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    // Redirect user to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
