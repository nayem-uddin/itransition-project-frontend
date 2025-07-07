import { useEffect, useState } from "react";
import {
  API_URL,
  delayInms,
  initialMessage,
  updateMessage,
} from "../../assets/universals";
import { useNavigate } from "react-router-dom";
import AdminInfo from "./AdminInfo";
import { useDispatch, useSelector } from "react-redux";
import { deselectAll, selectAll } from "./manageSlice";
import Actions from "../../components/topbars/admin top bar/admin access/Actions";
import LoadingAnim from "../../components/LoadingAnim";
import { getAllAdmins } from "./handleAdminsAPI";
import {
  Box,
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";

export default function ManageAccess() {
  const dispatch = useDispatch();
  const { selectedAdmins, isLoading, allAdmins } = useSelector(
    (state) => state.adminAccessReducer
  );
  const { isAdminsListUpdated } = useSelector(
    (state) => state.userManagementReducer
  );
  const feedback = useSelector((state) => state.adminAccessReducer.message);
  const columns = ["ID", "Full name", "Username", "Email", "Status"];
  const [adminsList, setAdminsList] = useState([]);
  const [message, setmessage] = useState({ ...feedback });
  const navigate = useNavigate();
  const isAllSelected = adminsList.length === selectedAdmins.length;
  useEffect(() => {
    updateMessage(setmessage, feedback);
    setTimeout(() => {
      if (feedback.type === "error") {
        sessionStorage.clear();
        navigate("/");
        location.reload();
      }
    }, delayInms);
  }, [feedback]);
  useEffect(() => {
    dispatch(getAllAdmins());
  }, [dispatch, isAdminsListUpdated]);
  useEffect(() => {
    function admins() {
      if (allAdmins.length === 0) return;
      setAdminsList([...allAdmins]);
    }
    admins();
  }, [allAdmins]);
  return (
    <div>
      {isLoading && <LoadingAnim />}
      {!isLoading && adminsList && (
        <TableContainer>
          <Actions message={message} setMessage={setmessage} />
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell padding="none">
                  <Checkbox
                    checked={isAllSelected}
                    onChange={(event) =>
                      dispatch(
                        event.target.checked ? selectAll() : deselectAll()
                      )
                    }
                  />
                </TableCell>
                {columns.map((column) => (
                  <TableCell
                    key={column}
                    scope="column"
                    component="th"
                    sx={{ fontWeight: "bold" }}
                  >
                    {column}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {adminsList.map((admin) => (
                <AdminInfo adminInfo={admin} key={admin.id} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
