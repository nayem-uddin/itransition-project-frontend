import { useLocation, useNavigate } from "react-router-dom";
import Answer from "./Answer";
import { useForm } from "react-hook-form";
import {
  formatForm,
  initialMessage,
  API_URL,
  updateMessage,
  requestForms,
  waitRequest,
  delayInms,
} from "../../assets/universals";
import DisplayMessage from "../DisplayMessage";
import { useEffect, useState } from "react";

export default function Form() {
  const location = useLocation();
  const form = location.state;
  const answers = form.response;
  const navigate = useNavigate();
  const defaultValues = Object.fromEntries(
    answers.map((answer, index) => [index, answer.answer])
  );
  const [message, setMessage] = useState(initialMessage);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { defaultValues },
  });
  useEffect(() => {
    reset(defaultValues);
  }, [answers]);
  async function onSubmit(data) {
    updateMessage(setMessage, waitRequest);
    const updatedForm = formatForm(form, data);
    const endpoint = sessionStorage.getItem("isAdmin")
      ? "form-manipulate"
      : "form";
    const res = await fetch(`${API_URL}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updatedForm),
      credentials: sessionStorage.getItem("isAdmin") ? "include" : "omit",
    });
    const received = await res.json();
    updateMessage(setMessage, received);
    if (res.ok) {
      requestForms(form.TemplateId, form.UserId);
      navigate(
        sessionStorage.getItem("isAdmin")
          ? "/admin-dashboard"
          : "/user-dashboard"
      );
    } else if ([403, 404].includes(res.status)) {
      setTimeout(() => {
        navigate("/", { replace: true });
        sessionStorage.clear();
        window.location.reload();
      }, delayInms);
    }
  }
  return (
    <div className="d-flex flex-column">
      <div className="m-auto" style={{ minWidth: "300px" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset
            disabled={
              !(
                sessionStorage.getItem("isAdmin") ||
                sessionStorage.getItem("id") == form.UserId
              )
            }
          >
            {answers.map((answer, index) => (
              <Answer
                key={index}
                ans={answer}
                index={index}
                register={register}
                responderId={form.UserId}
              />
            ))}
            <div className="d-flex justify-content-end">
              <DisplayMessage message={message} />
              <input type="submit" value="Update" />
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
