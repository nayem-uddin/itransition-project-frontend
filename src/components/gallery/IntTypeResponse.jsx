import { Slider } from "@mui/material";

export default function IntTypeResponse({
  min,
  max,
  qIdx,
  register,
  isDisabled,
}) {
  return (
    <div>
      <Slider
        min={Number(min)}
        max={Number(max)}
        marks
        valueLabelDisplay="auto"
        {...register(`${qIdx}`, { required: true })}
        disabled={isDisabled}
      />
    </div>
  );
}
