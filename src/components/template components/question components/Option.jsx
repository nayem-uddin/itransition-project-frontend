import { useState } from "react";
import ActionsOnOption from "./ActionsOnOption";
export default function Option({
  question,
  opt,
  index,
  handleChange,
  deleteOption,
}) {
  const [editMode, setEditMode] = useState(false);
  function handleBlur() {
    setEditMode(false);
  }
  function deleteAction() {
    deleteOption(index);
  }
  return (
    <div className="d-flex align-items-center">
      <div>
        <input type={question.type} name={question.title} value={opt} />
        {editMode ? (
          <input
            type="text"
            autoFocus
            value={opt}
            onChange={(e) => handleChange(e, index)}
            onBlur={handleBlur}
          />
        ) : (
          <label htmlFor={opt}>{opt}</label>
        )}
      </div>
      <ActionsOnOption setEditMode={setEditMode} deleteAction={deleteAction} />
    </div>
  );
}
