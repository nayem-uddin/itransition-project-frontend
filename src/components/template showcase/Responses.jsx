import { useEffect, useState } from "react";
import { socket } from "../../assets/universals";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Responses({ template }) {
  const [forms, setForms] = useState([]);
  const { id, Questions } = template;
  const questionsToPreview = Questions.filter((q) => q.showOnPreview);
  const navigate = useNavigate();
  function showForm(form) {
    navigate("/form", { state: form });
  }
  useEffect(() => {
    socket.emit("request-received-forms", id);
    socket.on("deliver-received-forms", (data) => {
      setForms(data.forms);
    });
  }, [id]);
  return (
    <div>
      <p className="h4">Selected questions:</p>
      {questionsToPreview.length === 0 ? (
        <div>No question to preview</div>
      ) : (
        <div>
          {questionsToPreview.map((q) => (
            <div>
              <p className="h5">{q.title}</p>
              <p>{q.description}</p>
            </div>
          ))}
        </div>
      )}

      <table>
        <p className="h4">Responses from users:</p>
        <tbody>
          {forms.length === 0 && <p>No response received</p>}
          {forms.map((form) => (
            <tr key={form.id}>
              <td className="pe-5">Response from {form.User.fullName}</td>
              <td>
                <Button onClick={() => showForm(form)}>
                  View full reponse
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
