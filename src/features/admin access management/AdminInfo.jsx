import { useDispatch, useSelector } from "react-redux";
import { deselectAdmin, selectAdmin } from "./manageSlice";

export default function AdminInfo({ adminInfo }) {
  const props = ["id", "fullName", "username", "email", "status"];
  const dispatch = useDispatch();
  const selectionList = useSelector(
    (state) => state.adminAccessReducer.selectedAdmins
  );
  const isSelected =
    selectionList.findIndex((admin) => admin.email === adminInfo.email) !== -1;
  return (
    <>
      <tr>
        <td>
          <input
            type="checkbox"
            onChange={(event) =>
              dispatch(
                event.target.checked
                  ? selectAdmin(adminInfo)
                  : deselectAdmin(adminInfo)
              )
            }
            checked={isSelected}
          />
        </td>
        {props.map((prop) => (
          <td key={prop}>{adminInfo[prop]}</td>
        ))}
      </tr>
    </>
  );
}
