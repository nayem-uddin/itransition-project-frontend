import { useDispatch, useSelector } from "react-redux";
import { deleteAdmins } from "../../../../features/admin access management/handleAdminsAPI";
import Delete from "../../../action buttons/Delete";

export default function DeleteAdmins({ promptPop }) {
  const { selectedAdmins } = useSelector((state) => state.adminAccessReducer);
  const dispatch = useDispatch();

  async function handleClick() {
    if (selectedAdmins?.length === 0) {
      promptPop();
      return;
    }
    dispatch(deleteAdmins(selectedAdmins));
  }
  return (
    <>
      <Delete handleClick={handleClick} items={"admins"} />
    </>
  );
}
