import { useLocation } from "react-router-dom";
import Logo from "./home top bar/Logo";
import NavLinks from "./home top bar/NavLinks";
import SearchBar from "./home top bar/SearchBar";

export default function Topbar() {
  const location = useLocation();
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark bg-gradient">
        <div className="container-fluid">
          <Logo />
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="true"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {location.pathname === "/" && <SearchBar />}
            <NavLinks />
          </div>
        </div>
      </nav>
    </>
  );
}
