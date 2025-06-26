import { useDispatch, useSelector } from "react-redux";
import Unblock from "../../../action buttons/Unblock";
import { blockUnblockUsers } from "../../../../features/user management/handleUsersAPI";

export default function UnblockUsers({ promptPop }) {
  const dispatch = useDispatch();
  const { selectedUsers } = useSelector((state) => state.userManagementReducer);
  async function handleClick() {
    if (selectedUsers?.length === 0) {
      promptPop();
      return;
    }
    dispatch(blockUnblockUsers("active"));
  }
  return (
    <>
      <Unblock handleClick={handleClick} items={"users"} />
    </>
  );
}
