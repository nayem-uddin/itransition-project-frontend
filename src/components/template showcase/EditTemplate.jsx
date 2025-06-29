import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { updateWholeTemplate } from "../../features/template creation/templateSlice";
import GeneralSettings from "../template components/template details/GeneralSettings";
import QuestionSet from "../../features/template creation/QuestionSet";
import {
  API_URL,
  initialMessage,
  waitRequest,
  notifyUpdate,
} from "../../assets/universals";
import Responses from "./Responses";
export default function EditTemplate() {
  const location = useLocation();
  const template = location.state;
  const dispatch = useDispatch();
  const updatedTemplate = useSelector((state) => state.templateReducer);
  const [message, setMessage] = useState(initialMessage);
  const navigate = useNavigate();
  function updateMessage(data) {
    setMessage(data);
    setTimeout(() => setMessage(initialMessage), 2000);
  }
  useEffect(() => {
    dispatch(updateWholeTemplate(template));
  }, [template]);
  async function handleClick(e) {
    setMessage(waitRequest);
    const res = await fetch(`${API_URL}/templates`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updatedTemplate),
    });
    const data = await res.json();
    if (res.ok) {
      notifyUpdate();
    } else if ([403, 404].includes(res.status)) {
      navigate("/");
      sessionStorage.clear();
      location.reload();
    }
    updateMessage(data);
  }
  return (
    <div className="d-flex flex-column">
      <div className="m-auto" style={{ minWidth: "300px" }}>
        <div className="d-flex justify-content-end">
          {message.text && (
            <div
              className={`m-auto ${
                message.type === "confirmation" ? "text-success" : "text-danger"
              }`}
            >
              {message.text}
            </div>
          )}
          <input
            type="button"
            value="Save"
            onClick={handleClick}
            className="btn btn-primary"
          />
        </div>
        <nav className="nav nav-tabs justify-content-center" id="myTab">
          <button
            className="nav-link active"
            id="accessibility-tab"
            data-bs-toggle="tab"
            data-bs-target="#accessibility-tab-pane"
            type="button"
            role="tab"
            aria-controls="accessibility-tab-pane"
            aria-selected="true"
          >
            General settings
          </button>

          <button
            className="nav-link"
            id="questions-tab"
            data-bs-toggle="tab"
            data-bs-target="#questions-tab-pane"
            type="button"
            role="tab"
            aria-controls="questions-tab-pane"
            aria-selected="false"
          >
            Questions
          </button>
          <button
            className="nav-link"
            id="results-tab"
            data-bs-toggle="tab"
            data-bs-target="#results-tab-pane"
            type="button"
            role="tab"
            aria-controls="results-tab-pane"
            aria-selected="false"
          >
            Results
          </button>
        </nav>
        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="accessibility-tab-pane"
            role="tabpanel"
            aria-labelledby="accessibility-tab"
            tabIndex="0"
          >
            <GeneralSettings />
          </div>
          <div
            className="tab-pane fade"
            id="questions-tab-pane"
            role="tabpanel"
            aria-labelledby="questions-tab"
            tabIndex="0"
          >
            <QuestionSet />
          </div>
          <div
            className="tab-pane fade"
            id="results-tab-pane"
            role="tabpanel"
            aria-labelledby="results-tab"
            tabIndex="0"
          >
            <Responses template={template} />
          </div>
        </div>
      </div>
    </div>
  );
}
