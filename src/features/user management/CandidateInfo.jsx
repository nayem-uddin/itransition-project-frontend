import { useDispatch, useSelector } from "react-redux";
import { deselectuser, selectUser } from "./controlSlice";
import { Checkbox, TableCell, TableRow } from "@mui/material";
export default function CandidateInfo({ candidate }) {
  const props = ["id", "fullName", "username", "email", "status"];
  const dispatch = useDispatch();
  const selectionList = useSelector(
    (state) => state.userManagementReducer.selectedUsers
  );
  const isSelected =
    selectionList.findIndex((user) => user.id == candidate.id) !== -1;
  return (
    <TableRow>
      <TableCell>
        <Checkbox
          onChange={(event) =>
            dispatch(
              event.target.checked
                ? selectUser(candidate)
                : deselectuser(candidate)
            )
          }
          checked={isSelected}
        />
      </TableCell>
      {props.map((prop) => (
        <TableCell key={prop}>{candidate[prop]}</TableCell>
      ))}
    </TableRow>
  );
}
