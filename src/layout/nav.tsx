import { AuthStatus } from "../auth/auth-status";
import { paths } from "../paths";
import { NavLinkProps, NavLink } from "./nav-link";

export const navLinks: { label: string; linkTo: string }[] = [
  { label: "Home", linkTo: paths.home },
  { label: "People", linkTo: paths.people },
  { label: "Planets", linkTo: paths.planets },
  { label: "Starships", linkTo: paths.starships },
] satisfies NavLinkProps[];

export function Nav() {
  return (
    <nav className="navbar navbar-expand-md">
      <div className="container-fluid">
        <div
          style={{ maxWidth: "60%" }}
          className="offcanvas offcanvas-start"
          tabIndex={-1}
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
              Swapi
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav flex-grow-1 pe-3">
              {navLinks.map((navLink, index) => (
                <li key={`${navLink.label}${index}`} className="nav-item">
                  <NavLink label={navLink.label} linkTo={navLink.linkTo} />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <AuthStatus />
      </div>
    </nav>
  );
}
