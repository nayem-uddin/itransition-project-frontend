import { TextareaAutosize } from "@mui/material";
import { useState } from "react";
import Markdown from "react-markdown";
export default function Description({ question, handleChange }) {
  const [editMode, setEditMode] = useState(false);
  const field = "description";
  return (
    <div>
      {editMode ? (
        <TextareaAutosize
          value={question[field]}
          className="input"
          onChange={(e) => handleChange(e, field)}
          onBlur={() => setEditMode(false)}
          autoFocus
        />
      ) : (
        <div onClick={() => setEditMode(true)} style={{ cursor: "text" }}>
          <p>{question[field]}</p>
        </div>
      )}
    </div>
  );
}
