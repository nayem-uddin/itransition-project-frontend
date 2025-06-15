import { Trash3Fill } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { deleteAdmins } from "../../../features/admin access management/handleAPI";
export default function Delete({ promptPop }) {
  const selectionList = useSelector(
    (state) => state.adminAccessReducer.selectedAdmins
  );
  const dispatch = useDispatch();
  function handleClick() {
    if (selectionList?.length === 0) {
      promptPop();
      return;
    }
    dispatch(deleteAdmins(selectionList));
  }
  return (
    <>
      <button
        onClick={handleClick}
        className="btn btn-outline-danger ms-2"
        toggle="tooltip"
        placement="bottom"
        title="Delete selected admins"
      >
        <Trash3Fill />
      </button>
    </>
  );
}
