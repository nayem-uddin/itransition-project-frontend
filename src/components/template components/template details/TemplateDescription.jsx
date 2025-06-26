import { InputLabel, TextareaAutosize } from "@mui/material";
import { useState } from "react";
import Markdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { setTemplateProp } from "../../../features/template creation/templateSlice";

export default function TemplateDescription() {
  const description = useSelector((state) => state.templateReducer.description);
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  return (
    <div className="mb-3">
      <InputLabel id="template-description">Description:</InputLabel>
      {!editMode ? (
        <div onClick={() => setEditMode(true)}>
          <Markdown>{description}</Markdown>
        </div>
      ) : (
        <TextareaAutosize
          value={description}
          onChange={(e) =>
            dispatch(
              setTemplateProp({ field: "description", value: e.target.value })
            )
          }
          onBlur={() => setEditMode(false)}
          autoFocus
        />
      )}
    </div>
  );
}
