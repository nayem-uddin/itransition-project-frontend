export default function DisplayError({ errorMessage }) {
  return (
    <div className="text-center">
      <p className="alert">{errorMessage}</p>
    </div>
  );
}
