import { delayInms } from "../../../../assets/universals";
import BlockUsers from "./BlockUsers";
import DeleteUsers from "./DeleteUsers";
import MakeAdmins from "./MakeAdmins";
import UnblockUsers from "./UnblockUsers";
export default function ActionsBar({ message, setMessage }) {
  function promptForEmptyList() {
    setMessage({ text: "Please select one or more users", type: "error" });
    setTimeout(() => setMessage({ text: "", type: null }), delayInms);
  }

  return (
    <div className="d-flex">
      <BlockUsers promptPop={promptForEmptyList} />
      <UnblockUsers promptPop={promptForEmptyList} />
      <DeleteUsers promptPop={promptForEmptyList} />
      <MakeAdmins promptPop={promptForEmptyList} />
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
