import { DatabaseFillAdd } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { addToAdmins } from "../../../../features/user management/handleUsersAPI";
import { useNavigate } from "react-router-dom";
import { API_URL, delayInms } from "../../../../assets/universals";
export default function MakeAdmins({ promptPop, setMessage }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedUsers } = useSelector((state) => state.userManagementReducer);
  async function handleClick() {
    if (selectedUsers?.length === 0) {
      promptPop();
      return;
    }
    const res = await fetch(`${API_URL}/admins`);
    const data = await res.json();
    const allAdmins = data.adminsList;
    const currentAdminIndex = allAdmins.findIndex(
      (admin) => admin.id == sessionStorage.getItem("id")
    );
    if (
      currentAdminIndex === -1 ||
      allAdmins[currentAdminIndex].status === "blocked"
    ) {
      setMessage({ text: "You have no more admin access", type: "error" });
      setTimeout(() => {
        setMessage({ text: "", type: null });
        sessionStorage.clear();
        navigate("/");
        location.reload();
      }, delayInms);
      return;
    }
    dispatch(addToAdmins(selectedUsers));
  }
  return (
    <>
      <button
        onClick={handleClick}
        className="btn btn-primary ms-2"
        toggle="tooltip"
        placement="bottom"
        title="Promote selected users to admins"
      >
        <DatabaseFillAdd />
      </button>
    </>
  );
}
