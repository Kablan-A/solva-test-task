import { Navigate } from "react-router-dom";
import { FormCard } from "../components/form-card";
import SignInForm from "../auth/sign-in-form";
import { paths } from "../paths";
import { useAuth } from "../util/hooks/use-auth";

export default function SignInPage() {
  const auth = useAuth();
  if (auth.isSignedIn) {
    // Redirect user to the home page
    // if already logged in
    return <Navigate to={paths.home} replace />;
  }

  return (
    <section className="min-vh-100 d-flex justify-content-center align-items-center bg-transparent">
      <div className="px-3 py-4 px-md-5">
        <div className="container">
          <div className="row gx-lg-5 align-items-center">
            <div className="col-lg-6 mb-5">
              <h1 className="mb-3 display-3 fw-bold">
                Test task Front-end <span className="text-primary">Solva</span>
              </h1>
              <p style={{ color: "hsl(217, 10%, 50.8%)" }}>
                Tech stack: React-Redux, React Hook Form, React Router v6,
                Typescript
              </p>
            </div>
            <div className="col-lg-6">
              <FormCard title="Sign in">
                <SignInForm />
              </FormCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
