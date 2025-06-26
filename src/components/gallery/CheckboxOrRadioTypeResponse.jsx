export default function CheckboxOrRadioTypeResponse({ question }) {
  const { title, options, type } = question;
  return (
    <div>
      {options.map((option) => (
        <div key={option}>
          <input type={type} name={title} value={option} />
          <label htmlFor={option}>{option}</label>
        </div>
      ))}
    </div>
  );
}
