import CreateQuestion from "../../components/template components/question components/CreateQuestion";
import { useDispatch, useSelector } from "react-redux";
import { addNewQuestion, reorderQuestions } from "./templateSlice";
import { useState } from "react";

export default function QuestionSet() {
  const template = useSelector((state) => state.templateReducer);
  const questions = template.Questions;
  const [oldPosition, setOldPosition] = useState(0);
  const dispatch = useDispatch();
  function handleClick() {
    dispatch(addNewQuestion());
  }
  function setDropPosition(newPosition) {
    dispatch(reorderQuestions({ oldPosition, newPosition }));
  }
  return (
    <div>
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

          <input
            type="button"
            value="Add new question"
            onClick={handleClick}
            disabled={questions.length === 16}
          />
        </fieldset>
      </form>
    </div>
  );
}
