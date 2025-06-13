import UserInfo from "../features/user dashboard/UserInfo";

export default function AdminDashboard() {
  return (
    <div>
      <div className="d-flex mt-3">
        <ul
          className="nav flex-column nav-pills nav-fill mb-3"
          id="pills-tab"
          role="tablist"
        >
          <li className="nav-item" role="presentation">
            <button
              className="nav-link nav-item active"
              id="pills-info-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-info"
              type="button"
              role="tab"
              aria-controls="pills-info"
              aria-selected="true"
            >
              Personal information
            </button>
          </li>

          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="pills-templates-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-templates"
              type="button"
              role="tab"
              aria-controls="pills-templates"
              aria-selected="false"
            >
              Manage templates
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="pills-responses-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-responses"
              type="button"
              role="tab"
              aria-controls="pills-responses"
              aria-selected="false"
            >
              Manage responses
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="pills-manage-access-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-manage-access"
              type="button"
              role="tab"
              aria-controls="pills-manage-access"
              aria-selected="false"
            >
              Responses sent
            </button>
          </li>
        </ul>
        <div className="tab-content w-50 m-auto" id="pills-tabContent">
          <div
            className="tab-pane fade show active"
            id="pills-info"
            role="tabpanel"
            aria-labelledby="pills-info-tab"
            tabIndex="0"
          >
            <UserInfo />
          </div>
          <div
            className="tab-pane fade"
            id="pills-responses"
            role="tabpanel"
            aria-labelledby="pills-responses-tab"
            tabIndex="0"
          >
            responses from other users
          </div>
          <div
            className="tab-pane fade"
            id="pills-templates"
            role="tabpanel"
            aria-labelledby="pills-templates-tab"
            tabIndex="0"
          >
            templates by user
          </div>
          <div
            className="tab-pane fade"
            id="pills-manage-access"
            role="tabpanel"
            aria-labelledby="pills-manage-access-tab"
            tabIndex="0"
          >
            Manage admin access
          </div>
        </div>
      </div>
    </div>
  );
}
