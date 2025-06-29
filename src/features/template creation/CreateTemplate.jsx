import QuestionSet from "./QuestionSet";
import GeneralSettings from "../../components/template components/template details/GeneralSettings";
import { useSelector } from "react-redux";
import { useState } from "react";
import {
  API_URL,
  initialMessage,
  notifyUpdate,
  waitRequest,
  updateMessage,
} from "../../assets/universals";
import { useNavigate } from "react-router-dom";
import DisplayMessage from "../../components/DisplayMessage";

export default function CreateTemplate() {
  const template = useSelector((state) => state.templateReducer);
  const [message, setmessage] = useState(initialMessage);
  const navigate = useNavigate();
  async function handleClick(e) {
    // console.log(template);
    setmessage(waitRequest);
    const res = await fetch(`${API_URL}/templates`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        ...template,
        UserId: sessionStorage.getItem("id"),
      }),
    });
    const data = await res.json();
    if (res.ok) {
      notifyUpdate();
    } else if ([403, 404].includes(res.status)) {
      navigate("/");
      sessionStorage.clear();
      location.reload();
    }
    updateMessage(setmessage, data);
  }
  return (
    <div>
      <div className="d-flex justify-content-end">
        {message.text && <DisplayMessage message={message} />}
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
      </div>
    </div>
  );
}
