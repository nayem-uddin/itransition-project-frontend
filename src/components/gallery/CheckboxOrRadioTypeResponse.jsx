export default function CheckboxOrRadioTypeResponse({
  question,
  register,
  idx,
}) {
  const { title, options, type } = question;
  return (
    <div>
      {options.map((option) => (
        <div key={option}>
          <input
            type={type}
            name={title}
            value={option}
            {...register(`${idx}`, { required: true })}
          />
          <label htmlFor={option}>{option}</label>
        </div>
      ))}
    </div>
  );
}
