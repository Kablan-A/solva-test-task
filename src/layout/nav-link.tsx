import { Link, useLocation } from "react-router-dom";

export interface NavLinkProps {
  label: string;
  linkTo: string;
}

export function NavLink({ label, linkTo }: NavLinkProps) {
  let { pathname } = useLocation();
  return (
    <Link
      to={linkTo}
      className={`nav-link ${pathname === linkTo && "text-success"}`}
      aria-current="page"
    >
      {label}
    </Link>
  );
}
