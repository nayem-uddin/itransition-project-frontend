import { useDispatch, useSelector } from "react-redux";
import Delete from "../../../action buttons/Delete";
import { deleteUsers } from "../../../../features/user management/handleUsersAPI";
export default function DeleteUsers({ promptPop }) {
  const dispatch = useDispatch();

  const { selectedUsers } = useSelector((state) => state.userManagementReducer);
  async function handleClick() {
    if (selectedUsers?.length === 0) {
      promptPop();
      return;
    }
    dispatch(deleteUsers(selectedUsers));
  }
  return (
    <>
      <Delete handleClick={handleClick} items={"users"} />
    </>
  );
}
