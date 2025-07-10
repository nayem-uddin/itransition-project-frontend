import { Slider } from "@mui/material";
import Markdown from "react-markdown";
export default function Answer({ ans, index, register, responderId }) {
  const { title, description, type, max, min, options } = ans.Question;
  const { answer } = ans;
  return (
    <div className="border border-dark-subtle mb-3 p-3">
      <p className="h5">{title}</p>
      <Markdown>{description}</Markdown>
      {type === "integer" && (
        <Slider
          min={min}
          max={max}
          defaultValue={answer}
          marks
          valueLabelDisplay="auto"
          {...register(`${index}`)}
          disabled={
            !(
              sessionStorage.getItem("isAdmin") ||
              sessionStorage.getItem("id") == responderId
            )
          }
        />
      )}
      {type === "string" && (
        <input type="text" defaultValue={answer} {...register(`${index}`)} />
      )}
      {type === "radio" &&
        options.map((option) => (
          <div key={option}>
            <input type="radio" value={option} {...register(`${index}`)} />
            <label htmlFor={option}>{option}</label>
          </div>
        ))}
      {type === "checkbox" &&
        options.map((option) => (
          <div key={option}>
            <input type="checkbox" value={option} {...register(`${index}`)} />
            <label htmlFor={option}>{option}</label>
          </div>
        ))}
    </div>
  );
}
