import { DatabaseFillAdd } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { addToAdmins } from "../../../../features/user management/handleUsersAPI";

export default function MakeAdmins({ promptPop }) {
  const dispatch = useDispatch();
  const { selectedUsers } = useSelector((state) => state.userManagementReducer);
  async function handleClick() {
    if (selectedUsers?.length === 0) {
      promptPop();
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
