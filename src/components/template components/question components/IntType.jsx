import { useState } from "react";
import SetMinMax from "./SetMinMax";

export default function IntType({ index, question }) {
  const [range, setRange] = useState({
    min: question?.min || 0,
    max: question?.max || 1,
  });
  function handleChange(e, field) {
    const value = e.target.value;
    setRange({ ...range, [field]: Number(value) });
  }
  return (
    <div>
      <SetMinMax
        index={index}
        handleChange={handleChange}
        field={"min"}
        range={range}
      />
      <SetMinMax
        index={index}
        handleChange={handleChange}
        field={"max"}
        range={range}
      />
    </div>
  );
}
