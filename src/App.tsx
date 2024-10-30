import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import { RequireAuth } from "./auth/components/require-auth";
import SignInPage from "./pages/sign-in";
import Layout from "./pages/layout";
import { paths } from "./paths";
import NotFound from "./pages/not-found";

export default function App() {
  return (
    <Routes>
      <Route
        path={paths.home}
        element={
          <RequireAuth>
            <Layout />
          </RequireAuth>
        }
      />
      <Route path={paths.auth.signIn} element={<SignInPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
