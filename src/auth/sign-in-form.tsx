import * as React from "react";
import { userSchema } from "../api/schemas";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../util/hooks/use-auth";
import { paths } from "../paths";
import { useAppDispatch } from "../state/hooks";
import { signIn } from "../state/auth-slice";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import type { TUser } from "../types/user";

export default function SignInForm(): React.JSX.Element {
  const auth = useAuth();
  const dispatch = useAppDispatch();

  let navigate = useNavigate();
  let location = useLocation();

  let from = location.state?.from?.pathname || paths.home;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TUser>({
    defaultValues: auth,
    resolver: yupResolver(userSchema),
  });

  const onSubmit = (data: TUser) => {
    // Update the user sign in and redirect to the protected page
    dispatch(signIn(data));
    // Send user back to the page they tried to visit when they were
    // redirected to the login page. Use { replace: true } so we don't create
    // another entry in the history stack for the login page.  This means that
    // when they get to the protected page and click the back button, they
    // won't end up back on the login page, which is also really nice for the
    // user experience.
    navigate(from, { replace: true });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-outline mb-4">
        <label className="form-label" htmlFor="username">
          Username
        </label>
        <input
          type="text"
          id="username"
          className="form-control"
          placeholder="admin"
          {...register("username")}
        />
        {errors && (
          <span className="text-danger">{errors.username?.message}</span>
        )}
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
          {...register("password")}
        />
        {errors && (
          <span className="text-danger">{errors.password?.message}</span>
        )}
      </div>

      <div className="form-check d-flex mb-4">
        <input
          className="form-check-input me-2"
          type="checkbox"
          id="rememberMe"
          {...register("remember")}
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
