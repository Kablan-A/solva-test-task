import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import SignInPage from "./pages/sign-in";
import { paths } from "./paths";
import { RequireAuth } from "./auth/require-auth";
import Layout from "./layout/layout";
import HomePage from "./pages/home";
import PersonPage from "./pages/people/person";
import PeoplePage from "./pages/people/people";
import PlanetsPage from "./pages/planets";
import StarshipsPage from "./pages/starships";
import NotFound from "./pages/not-found";

export default function App() {
  return (
    <Routes>
      {/* Public route */}
      <Route path={paths.auth.signIn} element={<SignInPage />} />

      {/* Protected routes */}
      <Route
        path={paths.home}
        element={
          <RequireAuth>
            <Layout />
          </RequireAuth>
        }
      >
        <Route index element={<HomePage />} />
        <Route path={paths.people} element={<PeoplePage />} />
        <Route path={`${paths.people}/:id`} element={<PersonPage />} />
        <Route path={paths.planets} element={<PlanetsPage />} />
        <Route path={paths.starships} element={<StarshipsPage />} />
      </Route>

      {/* 404 */}
      <Route path={paths.notFound} element={<NotFound />} />
    </Routes>
  );
}
