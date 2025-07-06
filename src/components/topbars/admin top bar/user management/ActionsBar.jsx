import { Toolbar } from "@mui/material";
import { updateMessage } from "../../../../assets/universals";
import BlockUsers from "./BlockUsers";
import DeleteUsers from "./DeleteUsers";
import MakeAdmins from "./MakeAdmins";
import UnblockUsers from "./UnblockUsers";
export default function ActionsBar({ message, setMessage }) {
  function promptForEmptyList() {
    updateMessage(setMessage, {
      text: "Please select one or more users",
      type: "error",
    });
  }

  return (
    <Toolbar>
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
    </Toolbar>
  );
}
