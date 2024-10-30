import { Link } from "react-router-dom";
import { paths } from "../paths";

export default function NotFound() {
  return (
    <main className="d-flex align-items-center justify-content-center min-vh-100">
      <div className="container" style={{ maxWidth: "600px" }}>
        <h3 className="display-4 fw-normal mt-3">404: Page not found</h3>
        <p className="lead text-secondary">
          You either tried some shady route or you came here by mistake.
          Whichever it is, try using the navigation.
        </p>
        <Link to={paths.home} className="btn btn-primary mt-3">
          <i className="bi bi-arrow-left"></i> Go home
        </Link>
      </div>
    </main>
  );
}
