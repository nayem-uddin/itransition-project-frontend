import UserLogin from "../features/user auth+reg/UserLogin";
import UserSignup from "../features/user auth+reg/UserSignup";

export default function UserPortal() {
  return (
    <div>
      <div style={{ width: "300px" }} className="m-auto">
        <ul
          className="nav nav-underline justify-content-center"
          id="myTab"
          role="tablist"
        >
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="login-tab"
              data-bs-toggle="tab"
              data-bs-target="#login-tab-pane"
              type="button"
              role="tab"
              aria-controls="login-tab-pane"
              aria-selected="true"
            >
              Login
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="signup-tab"
              data-bs-toggle="tab"
              data-bs-target="#signup-tab-pane"
              type="button"
              role="tab"
              aria-controls="signup-tab-pane"
              aria-selected="false"
            >
              Signup
            </button>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="login-tab-pane"
            role="tabpanel"
            aria-labelledby="login-tab"
            tabIndex="0"
          >
            <UserLogin />
          </div>
          <div
            className="tab-pane fade"
            id="signup-tab-pane"
            role="tabpanel"
            aria-labelledby="signup-tab"
            tabIndex="0"
          >
            <UserSignup />
          </div>
        </div>
      </div>
    </div>
  );
}
