import { useLocation, useNavigate } from "react-router-dom";
import Question from "./Question";
import Markdown from "react-markdown";
import { useForm } from "react-hook-form";
import {
  API_URL,
  initialMessage,
  requestForms,
  toForm,
  updateMessage,
} from "../../assets/universals";
import DisplayMessage from "../DisplayMessage";
import { useState } from "react";
export default function ViewFullTemplate() {
  const { register, handleSubmit } = useForm();
  const [message, setMessage] = useState(initialMessage);
  const currDate = new Date();
  const location = useLocation();
  const template = location.state;
  const navigate = useNavigate();
  const { title, description, Questions, accessibility } = template;
  const userId = sessionStorage.getItem("id");
  const hasAccess =
    userId &&
    (accessibility === "public" ||
      template?.usersWithAccess?.includes(Number(userId)));
  async function onSubmit(data) {
    const form = toForm(data, template.id, Questions);
    const res = await fetch(`${API_URL}/form`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(form),
    });
    const received = await res.json();
    updateMessage(setMessage, received);
    if (res.ok) {
      requestForms(template.id, template.UserId);
      navigate(
        sessionStorage.getItem("isAdmin")
          ? "/admin-dashboard"
          : "/user-dashboard"
      );
    }
  }
  return (
    <div className="d-flex flex-column">
      <div className="m-auto" style={{ minWidth: "300px" }}>
        <p className="h3">{title}</p>
        <Markdown>{description}</Markdown>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="username">Username</label> <br />
            <input
              type="text"
              name="username"
              disabled
              value={sessionStorage.getItem("username")}
            />{" "}
            <br />
            <label htmlFor="date">Date</label> <br />
            <input
              type="date"
              name="date"
              value={`${currDate.toISOString().split("T")[0]}`}
              disabled
            />
          </div>
          <fieldset disabled={!hasAccess}>
            {Questions.map((question, index) => (
              <Question
                key={question.id}
                question={question}
                idx={index}
                register={register}
                hasAccess={hasAccess}
              />
            ))}
            <div className="d-flex justify-content-end">
              <DisplayMessage message={message} />
              <input type="submit" value="Submit" />
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
