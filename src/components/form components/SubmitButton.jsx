export default function SubmitButton({ value }) {
  return (
    <>
      <input
        type="submit"
        value={value}
        className="btn btn-primary w-100 mt-2"
      />
    </>
  );
}
