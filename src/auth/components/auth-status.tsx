import { useAuth } from "../use-auth";
import { signOut } from "../../state/authSlice";
import { useAppDispatch } from "../../state/hooks";

export function AuthStatus() {
  let auth = useAuth();
  const dispatch = useAppDispatch();

  if (auth.isSignedIn) {
    return (
      <div className="container-fluid sticky-top p-2 bg-body-tertiary">
        <p className="lead m-0 d-flex align-items-center justify-content-between gap-3">
          Welcome, {auth.username}!{" "}
          <button
            className="btn btn-secondary"
            onClick={() => dispatch(signOut())}
          >
            Sign out
          </button>
        </p>
      </div>
    );
  }
}
