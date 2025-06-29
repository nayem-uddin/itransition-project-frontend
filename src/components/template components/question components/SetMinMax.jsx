import { useDispatch } from "react-redux";
import { setInputMinMax } from "../../../features/template creation/templateSlice";
export default function SetMinMax({ index, range, field, handleChange }) {
  const dispatch = useDispatch();
  return (
    <div className="mb-2">
      <label htmlFor={field} className="text-capitalize">
        {`${field}imum input:`}&nbsp;
      </label>
      <input
        type="number"
        name={field}
        placeholder={`${field}. input`}
        defaultValue={range[field]}
        onChange={(e) => handleChange(e, field)}
        onBlur={() => dispatch(setInputMinMax({ index, range }))}
        style={{ width: "100px" }}
      />
    </div>
  );
}
