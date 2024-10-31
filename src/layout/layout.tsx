import { Outlet } from "react-router-dom";
import { Nav } from "./nav";

export default function Layout() {
  return (
    <>
      <header className="container-fluid sticky-top p-2 bg-body-tertiary">
        <Nav />
      </header>
      <main className="min-vh-100 px-3 py-4 px-md-5">
        <Outlet />
      </main>
    </>
  );
}
