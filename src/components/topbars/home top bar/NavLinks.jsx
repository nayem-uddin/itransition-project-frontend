import { Link } from "react-router-dom";
import Logout from "./Logout";

export default function NavLinks() {
  return (
    <>
      <ul className="navbar-nav me-0 m-auto">
        <>
          {sessionStorage.getItem("id") ? (
            <div className="d-flex mt-2 mt-lg-0 align-items-center">
              <li>
                <Link
                  to={
                    sessionStorage.getItem("isAdmin")
                      ? "/admin-dashboard"
                      : "/user-dashboard"
                  }
                  className="text-white text-decoration-none me-lg-2"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Logout />
              </li>
            </div>
          ) : (
            <>
              <li>
                <Link
                  to="/admin-portal"
                  className="nav-item me-lg-2 text-white text-decoration-none"
                >
                  Admin portal
                </Link>
              </li>
              <li>
                <Link
                  to="/user-portal"
                  className="nav-item ms-lg-2 text-white text-decoration-none"
                >
                  User portal
                </Link>
              </li>
            </>
          )}
        </>
      </ul>
    </>
  );
}
