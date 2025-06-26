import { useDispatch, useSelector } from "react-redux";
import { blockUnblockAdmins } from "../../../../features/admin access management/handleAdminsAPI";
import Block from "../../../action buttons/Block";

export default function BlockAdmins({ promptPop }) {
  const dispatch = useDispatch();

  const { selectedAdmins } = useSelector((state) => state.adminAccessReducer);
  async function handleClick() {
    if (selectedAdmins?.length === 0) {
      promptPop();
      return;
    }
    dispatch(blockUnblockAdmins("blocked"));
  }

  return (
    <>
      <Block handleClick={handleClick} items={"admins"} />
    </>
  );
}
