import { useEffect, useState } from "react";
import { API_URL, delayInms } from "../../assets/universals";
import { useNavigate } from "react-router-dom";
import CandidateInfo from "./CandidateInfo";
import { useDispatch, useSelector } from "react-redux";

import LoadingAnim from "../../components/LoadingAnim";
import { deselectAllUsers, selectAllUsers } from "./controlSlice";
import ActionsBar from "../../components/topbars/admin top bar/user management/ActionsBar";
import { getAllAdmins } from "../admin access management/handleAdminsAPI";
import { getUsers } from "./handleUsersAPI";
import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
export default function ManageUsers() {
  const dispatch = useDispatch();
  const { allAdmins } = useSelector((state) => state.adminAccessReducer);
  const { selectedUsers, isLoading, isAdminsListUpdated, allUsers } =
    useSelector((state) => state.userManagementReducer);
  const feedback = useSelector((state) => state.userManagementReducer.message);
  const columns = ["ID", "Full name", "Username", "Email", "Status"];
  const [usersList, setUsersList] = useState([]);
  const [message, setmessage] = useState({ ...feedback });
  const navigate = useNavigate();
  const isAllSelected = usersList.length === selectedUsers.length;
  useEffect(() => {
    setmessage({ ...feedback });
    setTimeout(() => {
      setmessage({ text: "", type: null });
      if (feedback.type === "error") {
        sessionStorage.clear();
        navigate("/");
        location.reload();
      }
      return;
    }, delayInms);
  }, [feedback]);
  useEffect(() => {
    dispatch(getAllAdmins());
    dispatch(getUsers());
  }, [dispatch, isAdminsListUpdated]);
  useEffect(() => {
    function users() {
      if (!allAdmins.length || !allUsers.length) return;
      setUsersList([...allUsers]);
    }
    users();
  }, [allUsers, allAdmins]);
  return (
    <>
      {isLoading && <LoadingAnim />}
      {!isLoading && usersList && (
        <TableContainer>
          <ActionsBar message={message} setMessage={setmessage} />
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell padding="none">
                  <Checkbox
                    onChange={(event) =>
                      dispatch(
                        event.target.checked
                          ? selectAllUsers()
                          : deselectAllUsers()
                      )
                    }
                    checked={isAllSelected}
                  />
                </TableCell>
                {columns.map((column) => (
                  <TableCell
                    component="th"
                    scope="column"
                    key={column}
                    sx={{ fontWeight: "bold" }}
                  >
                    {column}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {usersList.map((user) => (
                <CandidateInfo candidate={user} key={user.id} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}
