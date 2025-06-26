import { TextField } from "@mui/material";
import { useState } from "react";
import Markdown from "react-markdown";

export default function Title({ question, handleChange }) {
  const [editMode, setEditMode] = useState(false);
  const field = "title";
  return (
    <div>
      {editMode ? (
        <TextField
          variant="filled"
          value={question[field]}
          type="text"
          onChange={(e) => handleChange(e, field)}
          onBlur={() => setEditMode(false)}
          autoFocus
        />
      ) : (
        <div onClick={() => setEditMode(true)} style={{ cursor: "text" }}>
          <p className="h4">{question[field]}</p>
        </div>
      )}
    </div>
  );
}
