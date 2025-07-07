import { useDispatch, useSelector } from "react-redux";
import { deselectAdmin, selectAdmin } from "./manageSlice";
import { Checkbox, TableCell, TableRow } from "@mui/material";

export default function AdminInfo({ adminInfo }) {
  const props = ["id", "fullName", "username", "email", "status"];
  const dispatch = useDispatch();
  const selectionList = useSelector(
    (state) => state.adminAccessReducer.selectedAdmins
  );
  const isSelected =
    selectionList.findIndex((admin) => admin.email === adminInfo.email) !== -1;
  return (
    <TableRow>
      <TableCell padding="none">
        <Checkbox
          onChange={(event) =>
            dispatch(
              event.target.checked
                ? selectAdmin(adminInfo)
                : deselectAdmin(adminInfo)
            )
          }
          checked={isSelected}
        />
      </TableCell>
      {props.map((prop) => (
        <TableCell key={prop}>{adminInfo[prop]}</TableCell>
      ))}
    </TableRow>
  );
}
