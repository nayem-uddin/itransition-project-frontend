import CheckboxTypeResponse from "./CheckboxOrRadioTypeResponse";
import IntTypeResponse from "./IntTypeResponse";
import CheckboxOrRadioTypeResponse from "./CheckboxOrRadioTypeResponse";
import StringTypeResponse from "./StringTypeResponse";
import Markdown from "react-markdown";

export default function Question({ question }) {
  const { title, description, type } = question;
  return (
    <div>
      <p className="h5">{title}</p>
      <Markdown>{description}</Markdown>
      {type === "integer" && (
        <IntTypeResponse max={question.max} min={question.min} />
      )}
      {type === "string" && <StringTypeResponse />}
      {["checkbox", "radio"].includes(type) && (
        <CheckboxOrRadioTypeResponse question={question} />
      )}
    </div>
  );
}
