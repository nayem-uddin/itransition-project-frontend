import { useDispatch, useSelector } from "react-redux";
import { blockUnblockAdmins } from "../../../../features/admin access management/handleAdminsAPI";
import Unblock from "../../../action buttons/Unblock";
import { API_URL } from "../../../../assets/universals";
export default function UnblockAdmins({ promptPop }) {
  const dispatch = useDispatch();
  const { selectedAdmins } = useSelector((state) => state.adminAccessReducer);

  async function handleClick() {
    if (selectedAdmins?.length === 0) {
      promptPop();
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
