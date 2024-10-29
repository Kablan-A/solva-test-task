import * as React from "react";
import { AuthContext } from "./auth-provider";

export function useAuth() {
  return React.useContext(AuthContext);
}
