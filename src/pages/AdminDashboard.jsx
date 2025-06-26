import ManageAccess from "../features/admin access management/ManageAccess";
import AdminsTemplateShowcase from "../features/admin-managed templates and forms/AdminsTemplateShowcase";
import UserInfo from "../features/user dashboard/UserInfo";
import ManageUsers from "../features/user management/ManageUsers";

export default function AdminDashboard() {
  return (
    <div>
      <div className="d-block d-lg-flex mt-3">
        <ul
          className="nav flex-column nav-pills nav-justified h-25"
          id="v-pills-tab"
          role="tablist"
        >
          <li className="nav-item" role="presentation">
            <button
              className="nav-link nav-item active"
              id="v-pills-info-tab"
              data-bs-toggle="pill"
              data-bs-target="#v-pills-info"
              type="button"
              role="tab"
              aria-controls="v-pills-info"
              aria-selected="true"
            >
              Personal information
            </button>
          </li>

          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="v-pills-templates-tab"
              data-bs-toggle="pill"
              data-bs-target="#v-pills-templates"
              type="button"
              role="tab"
              aria-controls="v-pills-templates"
              aria-selected="false"
            >
              Manage templates
            </button>
          </li>

          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="v-pills-responses-tab"
              data-bs-toggle="pill"
              data-bs-target="#v-pills-responses"
              type="button"
              role="tab"
              aria-controls="v-pills-responses"
              aria-selected="false"
            >
              Manage responses
            </button>
          </li>

          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="v-pills-manage-access-tab"
              data-bs-toggle="pill"
              data-bs-target="#v-pills-manage-access"
              type="button"
              role="tab"
              aria-controls="v-pills-manage-access"
              aria-selected="false"
            >
              Manage admin access
            </button>
          </li>

          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="v-pills-manage-users-tab"
              data-bs-toggle="pill"
              data-bs-target="#v-pills-manage-users"
              type="button"
              role="tab"
              aria-controls="v-pills-manage-users"
              aria-selected="false"
            >
              Manage users
            </button>
          </li>
        </ul>

        <div className="tab-content m-md-auto w-50" id="v-pills-tabContent">
          <div
            className="tab-pane fade show active"
            id="v-pills-info"
            role="tabpanel"
            aria-labelledby="v-pills-info-tab"
            tabIndex="0"
          >
            <UserInfo />
          </div>
          <div
            className="tab-pane fade"
            id="v-pills-responses"
            role="tabpanel"
            aria-labelledby="v-pills-responses-tab"
            tabIndex="0"
          >
            responses from users
          </div>
          <div
            className="tab-pane fade"
            id="v-pills-templates"
            role="tabpanel"
            aria-labelledby="v-pills-templates-tab"
            tabIndex="0"
          >
            <AdminsTemplateShowcase />
          </div>
          <div
            className="tab-pane fade"
            id="v-pills-manage-access"
            role="tabpanel"
            aria-labelledby="v-pills-manage-access-tab"
            tabIndex="0"
          >
            <ManageAccess />
          </div>
          <div
            className="tab-pane fade"
            id="v-pills-manage-users"
            role="tabpanel"
            aria-labelledby="v-pills-manage-users-tab"
            tabIndex="0"
          >
            <ManageUsers />
          </div>
        </div>
      </div>
    </div>
  );
}
