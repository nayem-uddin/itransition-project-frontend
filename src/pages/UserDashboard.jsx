import Allforms from "../components/sent forms showcase/AllForms";
import CreateTemplate from "../features/template creation/CreateTemplate";
import UserInfo from "../features/user dashboard/UserInfo";
import ViewTemplates from "../features/user dashboard/ViewTemplates";

export default function UserDashboard() {
  return (
    <>
      <div className="d-flex flex-column flex-md-row mt-3">
        <ul
          className="nav flex-column nav-pills nav-fill mb-3 h-25"
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
              Created templates
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
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="pills-create-template-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-create-template"
              type="button"
              role="tab"
              aria-controls="pills-create-template"
              aria-selected="false"
            >
              Create new template
            </button>
          </li>
        </ul>
        <div className="tab-content m-auto w-75" id="pills-tabContent">
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
            id="pills-templates"
            role="tabpanel"
            aria-labelledby="pills-templates-tab"
            tabIndex="0"
          >
            <ViewTemplates />
          </div>
          <div
            className="tab-pane fade"
            id="pills-sent-responses"
            role="tabpanel"
            aria-labelledby="pills-sent-responses-tab"
            tabIndex="0"
          >
            <Allforms />
          </div>
          <div
            className="tab-pane fade"
            id="pills-create-template"
            role="tabpanel"
            aria-labelledby="pills-create-template-tab"
            tabIndex="0"
          >
            <CreateTemplate />
          </div>
        </div>
      </div>
    </>
  );
}
