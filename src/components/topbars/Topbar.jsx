import { useLocation } from "react-router-dom";
import Logo from "./home top bar/Logo";
import NavLinks from "./home top bar/NavLinks";
import SearchBar from "./home top bar/SearchBar";
import SwitchTheme from "./home top bar/SwitchTheme";

export default function Topbar() {
  const location = useLocation();
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark bg-gradient">
        <div className="container-fluid position-relative">
          <Logo />

          {!["/user-portal", "/admin-portal"].includes(location.pathname) && (
            <SearchBar />
          )}

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
            <NavLinks />
          </div>
        </div>
        <SwitchTheme />
      </nav>
    </>
  );
}
