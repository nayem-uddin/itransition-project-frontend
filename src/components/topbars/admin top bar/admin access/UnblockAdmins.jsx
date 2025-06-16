import { useDispatch, useSelector } from "react-redux";
import { blockUnblockAdmins } from "../../../../features/admin access management/handleAdminsAPI";
import Unblock from "../../../action buttons/Unblock";
import { API_URL, delayInms } from "../../../../assets/universals";
import { useNavigate } from "react-router-dom";
export default function UnblockAdmins({ promptPop, setMessage }) {
  const dispatch = useDispatch();
  const { selectedAdmins } = useSelector((state) => state.adminAccessReducer);
  const navigate = useNavigate();
  async function handleClick() {
    if (selectedAdmins?.length === 0) {
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
    dispatch(blockUnblockAdmins("active"));
  }
  return (
    <>
      <Unblock handleClick={handleClick} items={"admins"} />
    </>
  );
}
