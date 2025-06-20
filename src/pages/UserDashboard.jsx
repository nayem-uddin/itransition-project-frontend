import UserInfo from "../features/user dashboard/UserInfo";

export default function UserDashboard() {
  return (
    <>
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
              Templates
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="pills-received-responses-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-received-responses"
              type="button"
              role="tab"
              aria-controls="pills-received-responses"
              aria-selected="false"
            >
              Responses received
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="pills-sent-responses-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-sent-responses"
              type="button"
              role="tab"
              aria-controls="pills-sent-responses"
              aria-selected="false"
            >
              Responses sent
            </button>
          </li>
        </ul>
        <div className="tab-content m-auto" id="pills-tabContent">
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
            id="pills-received-responses"
            role="tabpanel"
            aria-labelledby="pills-received-responses-tab"
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
            id="pills-sent-responses"
            role="tabpanel"
            aria-labelledby="pills-sent-responses-tab"
            tabIndex="0"
          >
            responses from user to other forms
          </div>
        </div>
      </div>
    </>
  );
}
