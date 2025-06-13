export default function TextOrEmail({ register, field, label, type }) {
  return (
    <>
      <label htmlFor={field} className="mt-2">
        {label}
      </label>
      <input
        type={type}
        name={field}
        {...register(`${field}`, { required: true })}
        className="form-control border border-dark-subtle"
      />
    </>
  );
}
