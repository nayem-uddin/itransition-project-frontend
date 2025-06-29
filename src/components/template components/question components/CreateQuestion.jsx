import IntType from "./IntType";
import { useDispatch } from "react-redux";
import {
  deleteQuestionProperties,
  setAnyQuestionProp,
} from "../../../features/template creation/templateSlice";
import RadioOrCheckBoxType from "./RadioOrCheckboxType";
import Title from "./Title";
import Description from "./Description";
import { InputLabel, MenuItem, Select } from "@mui/material";
import ShowOnPreview from "./ShowOnPreview";

export default function CreateQuestion({ question, index }) {
  const dispatch = useDispatch();
  const types = ["string", "integer", "checkbox", "radio"];
  const qType = question.type;
  function handleChange(e, field) {
    dispatch(setAnyQuestionProp({ index, field, value: e.target.value }));
  }
  function setQuestionType(e) {
    const value = e.target.value;
    dispatch(setAnyQuestionProp({ index, field: "type", value }));
    if (["string", "integer"].includes(value)) {
      const properties = ["options"];
      if (value === "string") {
        properties.push("max", "min");
      }
      dispatch(deleteQuestionProperties({ index, properties }));
    }
  }
  return (
    <div className="mb-3 border border-dark-subtle p-3">
      <Title question={question} handleChange={handleChange} />
      <Description question={question} handleChange={handleChange} />
      <label htmlFor="type" id="type">
        Select answer type:
      </label>
      <br />
      <Select
        label="type"
        value={qType}
        onChange={setQuestionType}
        labelId="type"
      >
        {types.map((type) => (
          <MenuItem value={type}>
            <span className="text-capitalize">{type}</span>
          </MenuItem>
        ))}
      </Select>
      {question.type === "integer" && (
        <IntType index={index} question={question} />
      )}
      {["radio", "checkbox"].includes(question.type) && (
        <RadioOrCheckBoxType question={question} index={index} />
      )}
      <ShowOnPreview question={question} index={index} />
    </div>
  );
}
