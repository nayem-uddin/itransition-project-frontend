import { useDispatch, useSelector } from "react-redux";
import { deselectuser, selectUser } from "./controlSlice";
export default function CandidateInfo({ candidate }) {
  const props = ["id", "fullName", "username", "email", "status"];
  const dispatch = useDispatch();
  const selectionList = useSelector(
    (state) => state.userManagementReducer.selectedUsers
  );
  const isSelected =
    selectionList.findIndex((user) => user.id == candidate.id) !== -1;
  return (
    <>
      <tr>
        <td>
          <input
            type="checkbox"
            onChange={(event) =>
              dispatch(
                event.target.checked
                  ? selectUser(candidate)
                  : deselectuser(candidate)
              )
            }
            checked={isSelected}
          />
        </td>
        {props.map((prop) => (
          <td key={prop}>{candidate[prop]}</td>
        ))}
      </tr>
    </>
  );
}
