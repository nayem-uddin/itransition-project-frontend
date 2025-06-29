import { Slider } from "@mui/material";
import Markdown from "react-markdown";
export default function Answer({ ans, index, register, responderId }) {
  const { qTitle, qDescription, qType, qMax, qMin, qOptions, answer } = ans;
  return (
    <div className="border border-dark-subtle mb-3 p-3">
      <p className="h5">{qTitle}</p>
      <Markdown>{qDescription}</Markdown>
      {qType === "integer" && (
        <Slider
          min={qMin}
          max={qMax}
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
      {qType === "string" && (
        <input type="text" defaultValue={answer} {...register(`${index}`)} />
      )}
      {qType === "radio" &&
        qOptions.map((option) => (
          <div key={option}>
            <input type="radio" value={option} {...register(`${index}`)} />
            <label htmlFor={option}>{option}</label>
          </div>
        ))}
      {qType === "checkbox" &&
        qOptions.map((option) => (
          <div key={option}>
            <input type="checkbox" value={option} {...register(`${index}`)} />
            <label htmlFor={option}>{option}</label>
          </div>
        ))}
    </div>
  );
}
