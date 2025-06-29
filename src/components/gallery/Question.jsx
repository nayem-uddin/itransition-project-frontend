import CheckboxTypeResponse from "./CheckboxOrRadioTypeResponse";
import IntTypeResponse from "./IntTypeResponse";
import CheckboxOrRadioTypeResponse from "./CheckboxOrRadioTypeResponse";
import StringTypeResponse from "./StringTypeResponse";
import Markdown from "react-markdown";

export default function Question({ question, register, hasAccess, idx }) {
  const { title, description, type } = question;
  return (
    <div className="border border-dark-subtle mb-3 p-3">
      <p className="h5">{title}</p>
      <Markdown>{description}</Markdown>
      {type === "integer" && (
        <IntTypeResponse
          max={question.max}
          min={question.min}
          register={register}
          qIdx={idx}
          isDisabled={!hasAccess}
        />
      )}
      {type === "string" && (
        <StringTypeResponse register={register} qIdx={idx} />
      )}
      {["checkbox", "radio"].includes(type) && (
        <CheckboxOrRadioTypeResponse
          question={question}
          register={register}
          idx={idx}
        />
      )}
    </div>
  );
}
