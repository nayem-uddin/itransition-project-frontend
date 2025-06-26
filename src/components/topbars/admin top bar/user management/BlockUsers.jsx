import { useDispatch, useSelector } from "react-redux";
import Block from "../../../action buttons/Block";
import { blockUnblockUsers } from "../../../../features/user management/handleUsersAPI";
export default function BlockUsers({ promptPop }) {
  const dispatch = useDispatch();
  const { selectedUsers } = useSelector((state) => state.userManagementReducer);
  async function handleClick() {
    if (selectedUsers?.length === 0) {
      promptPop();
      return;
    }
    dispatch(blockUnblockUsers("blocked"));
  }

  return (
    <>
      <Block handleClick={handleClick} items={"users"} />
    </>
  );
}
