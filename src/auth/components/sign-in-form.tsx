import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../use-auth";
import { paths } from "../../paths";
import { useAppDispatch } from "../../state/hooks";
import {
  signIn,
  updateUsername,
  updatePassword,
  updateRemember,
} from "../../state/authSlice";
import type { TUser } from "../../types/user";

export default function SignInForm(): React.JSX.Element {
  const auth = useAuth();
  const dispatch = useAppDispatch();

  let navigate = useNavigate();
  let location = useLocation();

  let from = location.state?.from?.pathname || paths.home;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newSignIn: TUser = {
      username: auth.username as string,
      password: auth.password as string,
      remember: auth.remember,
    };

    // Update the user sign in and redirect to the protected page
    dispatch(signIn(newSignIn));
    // Send user back to the page they tried to visit when they were
    // redirected to the login page. Use { replace: true } so we don't create
    // another entry in the history stack for the login page.  This means that
    // when they get to the protected page and click the back button, they
    // won't end up back on the login page, which is also really nice for the
    // user experience.
    navigate(from, { replace: true });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-outline mb-4">
        <label className="form-label" htmlFor="username">
          Username
        </label>
        <input
          type="text"
          id="username"
          className="form-control"
          placeholder="admin"
          onChange={(event) => dispatch(updateUsername(event.target.value))}
          required
        />
      </div>

      <div className="form-outline mb-2">
        <label className="form-label" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="form-control"
          placeholder="123456"
          onChange={(event) => dispatch(updatePassword(event.target.value))}
          required
        />
      </div>

      <div className="form-check d-flex mb-4">
        <input
          className="form-check-input me-2"
          type="checkbox"
          id="rememberMe"
          onChange={(event) => dispatch(updateRemember(event.target.checked))}
          checked={auth.remember}
        />
        <label className="form-check-label" htmlFor="rememberMe">
          Remember me
        </label>
      </div>

      <button type="submit" className="btn btn-primary">
        Sign in
      </button>
    </form>
  );
}
