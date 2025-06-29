export default function DisplayMessage({ message }) {
  return (
    <div
      className={`m-auto ${
        message.type === "confirmation" ? "text-success" : "text-danger"
      }`}
    >
      {message.text}
    </div>
  );
}
