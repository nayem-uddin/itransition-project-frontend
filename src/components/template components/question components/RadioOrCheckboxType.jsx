import { useDispatch } from "react-redux";
import { modifyOptions } from "../../../features/template creation/templateSlice";
import Option from "./Option";
import { Button, IconButton, Tooltip } from "@mui/material";
import { AddCircle } from "@mui/icons-material";

export default function RadioOrCheckBoxType({ question, index }) {
  const dispatch = useDispatch();
  const options = question?.options || [];
  function addNewOption() {
    dispatch(modifyOptions({ index, options: [...options, "option"] }));
  }
  function handleChange(e, idx) {
    const value = e.target.value;
    dispatch(
      modifyOptions({ index, options: options.toSpliced(idx, 1, value) })
    );
  }
  function deleteOption(idx) {
    dispatch(modifyOptions({ index, options: options.toSpliced(idx, 1) }));
  }
  return (
    <div>
      {options?.map((opt, index) => (
        <Option
          key={index}
          opt={opt}
          index={index}
          question={question}
          handleChange={handleChange}
          deleteOption={deleteOption}
        />
      ))}
      <Tooltip title="Add new option">
        <IconButton color="primary" onClick={addNewOption}>
          <AddCircle />
        </IconButton>
      </Tooltip>
    </div>
  );
}
