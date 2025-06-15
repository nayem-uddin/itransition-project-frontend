import { Unlock2Fill } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { blockUnblockAdmins } from "../../../features/admin access management/handleAPI";

export default function Unblock({ promptPop }) {
  const dispatch = useDispatch();
  const selectionList = useSelector(
    (state) => state.adminAccessReducer.selectedAdmins
  );
  function handleClick() {
    if (selectionList?.length === 0) {
      promptPop();
      return;
    }
    dispatch(blockUnblockAdmins("active"));
  }
  return (
    <>
      <button
        className="btn btn-success ms-2"
        toggle="tooltip"
        placement="bottom"
        title="Unblock selected admins"
        onClick={handleClick}
      >
        <Unlock2Fill />
      </button>
    </>
  );
}
