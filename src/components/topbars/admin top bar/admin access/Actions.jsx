import { delayInms } from "../../../../assets/universals";
import BlockAdmins from "./BlockAdmins";
import DeleteAdmins from "./DeleteAdmins";
import UnblockAdmins from "./UnblockAdmins";
export default function Actions({ message, setMessage }) {
  function promptForEmptyList() {
    setMessage({ text: "Please select one or more admins", type: "error" });
    setTimeout(() => setMessage({ text: "", type: null }), delayInms);
  }
  return (
    <div className="d-flex">
      <BlockAdmins promptPop={promptForEmptyList} />
      <UnblockAdmins promptPop={promptForEmptyList} />
      <DeleteAdmins promptPop={promptForEmptyList} />
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
