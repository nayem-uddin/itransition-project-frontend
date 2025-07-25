import CreateQuestion from "../../components/template components/question components/CreateQuestion";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewQuestion,
  removeQuestions,
  reorderQuestions,
} from "./templateSlice";
import { useState } from "react";
import { Button } from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import {
  API_URL,
  initialMessage,
  updateMessage,
  waitRequest,
  delayInms,
} from "../../assets/universals";
import { useNavigate } from "react-router-dom";
import PopupMessage from "../../components/template showcase/PopupMessage";

export default function QuestionSet() {
  const template = useSelector((state) => state.templateReducer);
  const [message, setMessage] = useState(initialMessage);
  const [open, setOpen] = useState(false);
  const questions = template.Questions;
  const selectedQuestions = template.selectedQuestions;
  const [oldPosition, setOldPosition] = useState(0);
  const dispatch = useDispatch();
  const pathname = location.pathname;
  const navigate = useNavigate();
  function handleClick() {
    dispatch(addNewQuestion());
  }
  function setDropPosition(newPosition) {
    dispatch(reorderQuestions({ oldPosition, newPosition }));
  }
  async function deleteQuestions() {
    if (pathname === "/edit-template") {
      setOpen(true);
      setMessage(waitRequest);
      const isAdmin = sessionStorage.getItem("isAdmin");
      const res = await fetch(
        `${API_URL}/${isAdmin ? "questions-manipulate" : "questions"}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
          },
          credentials: isAdmin ? "include" : "omit",
          body: JSON.stringify({
            UserId: template.UserId ?? sessionStorage.getItem("id"),
            selectedQuestions,
          }),
        }
      );
      const data = await res.json();
      updateMessage(setMessage, data);
      if ([403, 404].includes(res.status)) {
        setTimeout(() => {
          navigate("/", { replace: true });
          sessionStorage.clear();
          location.reload();
        }, delayInms);
        return;
      }
    }
    dispatch(removeQuestions());
  }
  return (
    <div>
      <div className="mb-3 sticky-top bg-white">
        <Button
          variant="outlined"
          startIcon={<Delete />}
          color="error"
          onClick={deleteQuestions}
        >
          delete selected questions
        </Button>
        <PopupMessage message={message} isOpen={open} setOpen={setOpen} />
      </div>
      <form>
        <fieldset>
          {questions.map((q, index) => (
            <div
              key={index}
              draggable
              onDragStart={() => setOldPosition(index)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => setDropPosition(index)}
            >
              <CreateQuestion question={q} index={index} />
            </div>
          ))}
          <Button
            variant="outlined"
            onClick={handleClick}
            disabled={questions.length === 16}
            color="success"
            startIcon={<Add />}
          >
            Add new question
          </Button>
        </fieldset>
      </form>
    </div>
  );
}
