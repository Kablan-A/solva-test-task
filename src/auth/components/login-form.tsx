import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../use-auth";

export default function LoginForm(): React.JSX.Element {
  const auth = useAuth();
  let navigate = useNavigate();
  let location = useLocation();

  let from = location.state?.from?.pathname || "/";

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const validateEmail = () => {
    if (!email) {
      setEmailError("Email is required");
      return false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Invalid email format");
      return false;
    } else {
      setEmailError("");
      return true;
    }
  };
  const validatePassword = () => {
    if (!password) {
      setPasswordError("Password is required");
      return false;
    } else {
      setPasswordError("");
      return true;
    }
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateEmail() && validatePassword()) {
      auth.signin(email, () => {
        // Send user back to the page they tried to visit when they were
        // redirected to the login page. Use { replace: true } so we don't create
        // another entry in the history stack for the login page.  This means that
        // when they get to the protected page and click the back button, they
        // won't end up back on the login page, which is also really nice for the
        // user experience.
        navigate(from, { replace: true });
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="form-control"
          placeholder="john.doe@example.com"
          onChange={(event) => setEmail(event.target.value)}
          onBlur={validateEmail}
        />
        <div
          className="invalid-feedback"
          style={{ display: emailError ? "block" : "none" }}
        >
          {emailError}
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="form-control"
          placeholder="********"
          onChange={(event) => setPassword(event.target.value)}
          onBlur={validatePassword}
        />
        <div
          className="invalid-feedback"
          style={{ display: passwordError ? "block" : "none" }}
        >
          {passwordError}
        </div>
      </div>
      <button type="submit" className="btn btn-primary w-100 mt-3">
        Sign In
      </button>
    </form>
  );
}
