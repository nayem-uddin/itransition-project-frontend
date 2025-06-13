import { Link } from "react-router-dom";
import Logout from "./Logout";

export default function NavLinks() {
  return (
    <>
      <nav className="navbar-nav me-0 m-auto">
        <div>
          {sessionStorage.getItem("id") ? (
            <>
              <Link
                to={
                  sessionStorage.getItem("isAdmin")
                    ? "/admin-dashboard"
                    : "/user-dashboard"
                }
                className="text-white text-decoration-none me-2"
              >
                Dashboard
              </Link>
              <Logout />
            </>
          ) : (
            <>
              <Link
                to="/admin-portal"
                className="nav-item me-2 text-white text-decoration-none"
              >
                Admin portal
              </Link>

              <Link
                to="/user-portal"
                className="nav-item ms-2 text-white text-decoration-none"
              >
                User portal
              </Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
}
