import { useDispatch } from "react-redux";
import { setAnyQuestionProp } from "../../../features/template creation/templateSlice";

export default function ShowOnPreview({ question, index }) {
  const previewCheck = question.showOnPreview;
  const dispatch = useDispatch();

  function setPreviewInclusion(e) {
    const value = e.target.checked;
    dispatch(setAnyQuestionProp({ index, field: "showOnPreview", value }));
  }

  return (
    <div className="d-flex justify-content-end">
      <input
        type="checkbox"
        onChange={setPreviewInclusion}
        checked={previewCheck}
        name="checkbox"
      />
      <label htmlFor="checkbox">&nbsp;Show on form preview</label>
    </div>
  );
}
