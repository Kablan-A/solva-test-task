import { Outlet } from "react-router-dom";
import { Nav } from "./nav";
import { Footer } from "./footer";

export default function Layout() {
  return (
    <>
      <header className="container-fluid p-2 bg-body-tertiary">
        <Nav />
      </header>
      <main className="px-3 py-4 px-md-5">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
