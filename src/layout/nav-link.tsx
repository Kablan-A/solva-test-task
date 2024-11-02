import { Link, useLocation } from "react-router-dom";
import { isActiveLink } from "../util/is-active-link";

export interface NavLinkProps {
  label: string;
  linkTo: string;
}

export function NavLink({ label, linkTo }: NavLinkProps) {
  let { pathname } = useLocation();
  return (
    <Link
      to={linkTo}
      className={`nav-link btn btn-sm btn-light text-start ${
        isActiveLink(pathname, linkTo) && "text-success"
      }`}
      aria-current="page"
    >
      {label}
    </Link>
  );
}
