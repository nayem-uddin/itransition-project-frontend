import Block from "./Block";
import Delete from "./Delete";
import Unblock from "./Unblock";

export default function Actions({ message, setMessage }) {
  function promptForEmptyList() {
    setMessage({ text: "Please select one or more admins", type: "error" });
    setTimeout(() => setMessage({ text: "", type: null }), 3000);
  }
  return (
    <div className="d-flex">
      <Block promptPop={promptForEmptyList} />
      <Unblock promptPop={promptForEmptyList} />
      <Delete promptPop={promptForEmptyList} />
      <div
        className={`m-auto ${
          message.type === "confirmation" ? "text-success" : "text-danger"
        }`}
      >
        {message.text}
      </div>
    </div>
  );
}
