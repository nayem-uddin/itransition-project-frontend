import { useDispatch, useSelector } from "react-redux";
import { setTemplateProp } from "../../../features/template creation/templateSlice";
import { InputLabel, MenuItem, Select } from "@mui/material";

export default function ChooseAccessibility() {
  const accessibility = useSelector(
    (state) => state.templateReducer.accessibility
  );
  const options = ["public", "restricted"];
  const dispatch = useDispatch();
  function handleChange(event) {
    dispatch(
      setTemplateProp({ field: "accessibility", value: event.target.value })
    );
  }
  return (
    <div className="mb-3">
      <InputLabel id="accessibility">Accessibility for users:</InputLabel>
      <Select
        label="accessibility"
        labelId="accessibility"
        value={accessibility}
        onChange={handleChange}
      >
        {options.map((option) => (
          <MenuItem value={option}>
            <span className="text-capitalize">{option}</span>
          </MenuItem>
        ))}
      </Select>
    </div>
  );
}
