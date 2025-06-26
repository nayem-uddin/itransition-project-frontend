import { useState } from "react";

export default function Option({ question, opt, index, handleChange }) {
  const [editMode, setEditMode] = useState(false);
  function handleClick(e) {
    setEditMode(true);
  }
  function handleBlur(e) {
    setEditMode(false);
  }
  return (
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
        <label htmlFor={opt} onClick={handleClick}>
          {opt}
        </label>
      )}
    </div>
  );
}
