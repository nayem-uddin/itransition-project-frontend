import { useNavigate } from "react-router-dom";
import { delayInms } from "../../../../assets/universals";
import BlockUsers from "./BlockUsers";
import DeleteUsers from "./DeleteUsers";
import MakeAdmins from "./MakeAdmins";
import UnblockUsers from "./UnblockUsers";
import { API_URL } from "../../../../assets/universals";
export default function ActionsBar({ message, setMessage }) {
  const navigate = useNavigate();
  function promptForEmptyList() {
    setMessage({ text: "Please select one or more users", type: "error" });
    setTimeout(() => setMessage({ text: "", type: null }), delayInms);
  }
  async function checkAdminAccess() {
    const res = await fetch(`${API_URL}/admins`);
    const data = await res.json();
    if (!res.ok) {
      setMessage({
        text: data?.message ?? "Error loading data",
        type: "error",
      });
      setTimeout(() => setMessage({ text: "", type: null }), 3000);
      return;
    }
    const admins = data.adminsList;
    const currentAdminIndex = admins.findIndex(
      (user) => user.id == sessionStorage.getItem("id")
    );
    if (
      currentAdminIndex === -1 ||
      admins[currentAdminIndex].status === "blocked"
    ) {
      setMessage({
        text: "You have no more admin access",
        type: "error",
      });
      setTimeout(() => {
        setMessage({ text: "", type: null });
        sessionStorage.clear();
        navigate("/");
        location.reload();
      }, 3000);
      return;
    }
  }
  return (
    <div className="d-flex">
      <BlockUsers promptPop={promptForEmptyList} setMessage={setMessage} />
      <UnblockUsers promptPop={promptForEmptyList} setMessage={setMessage} />
      <DeleteUsers promptPop={promptForEmptyList} setMessage={setMessage} />
      <MakeAdmins promptPop={promptForEmptyList} setMessage={setMessage} />
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
