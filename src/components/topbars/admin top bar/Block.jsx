import { Ban } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { blockUnblockAdmins } from "../../../features/admin access management/handleAPI";

export default function Block({ promptPop }) {
  const dispatch = useDispatch();
  const selectionList = useSelector(
    (state) => state.adminAccessReducer.selectedAdmins
  );
  function handleClick() {
    if (selectionList?.length === 0) {
      promptPop();
      return;
    }
    dispatch(blockUnblockAdmins("blocked"));
  }

  return (
    <>
      <button
        onClick={handleClick}
        className="btn btn-danger"
        toggle="tooltip"
        placement="bottom"
        title="Block selected admins"
      >
        <Ban />
      </button>
    </>
  );
}
