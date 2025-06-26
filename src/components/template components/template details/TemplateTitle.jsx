import { InputLabel, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setTemplateProp } from "../../../features/template creation/templateSlice";
import { useState } from "react";
import Markdown from "react-markdown";

export default function TemplateTitle() {
  const title = useSelector((state) => state.templateReducer.title);
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  return (
    <div className="mb-3">
      <InputLabel id="template-title">Title:</InputLabel>
      {editMode ? (
        <TextField
          variant="filled"
          value={title}
          onChange={(e) =>
            dispatch(setTemplateProp({ field: "title", value: e.target.value }))
          }
          onBlur={() => setEditMode(false)}
          autoFocus
        />
      ) : (
        <div onClick={() => setEditMode(true)}>
          <p className="h3">{title}</p>
        </div>
      )}
    </div>
  );
}
