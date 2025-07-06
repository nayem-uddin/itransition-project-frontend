import { Toolbar } from "@mui/material";
import { delayInms, initialMessage } from "../../../../assets/universals";
import BlockAdmins from "./BlockAdmins";
import DeleteAdmins from "./DeleteAdmins";
import UnblockAdmins from "./UnblockAdmins";
import { ToolbarButton } from "@mui/x-data-grid";
export default function Actions({ message, setMessage }) {
  function promptForEmptyList() {
    setMessage({ text: "Please select one or more admins", type: "error" });
    setTimeout(() => setMessage(initialMessage), delayInms);
  }
  return (
    <>
      <Toolbar>
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
      </Toolbar>
    </>
  );
}
