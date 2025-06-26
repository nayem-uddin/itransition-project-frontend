import { useState } from "react";
import { useDispatch } from "react-redux";
import { setInputMinMax } from "../../../features/template creation/templateSlice";

export default function IntType({ index, question }) {
  const [range, setRange] = useState({
    min: question?.min || 0,
    max: question?.max || 1,
  });
  const dispatch = useDispatch();
  function handleChange(e, field) {
    const value = e.target.value;
    setRange({ ...range, [field]: Number(value) });
  }
  return (
    <div>
      <label htmlFor="min">Minimum input</label>
      <input
        type="number"
        name="min"
        placeholder="min. input"
        value={range.min}
        onChange={(e) => handleChange(e, "min")}
        onBlur={() => dispatch(setInputMinMax({ index, range }))}
        autoFocus
      />
      <label htmlFor="max">Maximum input</label>
      <input
        type="number"
        name="max"
        placeholder="max. input"
        value={range.max}
        onChange={(e) => handleChange(e, "max")}
        onBlur={() => dispatch(setInputMinMax({ index, range }))}
      />
    </div>
  );
}
