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
    setTimeout(() => setmessage({ text: "", type: null }), delayInms);
  }, [feedback.text]);
  useEffect(() => {
    dispatch(getAllAdmins());
    dispatch(getUsers());
  }, [dispatch, isAdminsListUpdated]);
  useEffect(() => {
    function users() {
      if (!allAdmins.length || !allUsers.length) return;
      const currentAdminIndex = allAdmins.findIndex(
        (user) => user.id == sessionStorage.getItem("id")
      );
      if (
        currentAdminIndex === -1 ||
        allAdmins[currentAdminIndex].status === "blocked"
      ) {
        setmessage({
          text: "You have no more admin access",
          type: "error",
        });
        setTimeout(() => {
          setmessage({ text: "", type: null });
          sessionStorage.clear();
          navigate("/");
          location.reload();
        }, delayInms);
        return;
      }
      setUsersList([...allUsers]);
    }
    users();
  }, [allUsers, allAdmins]);
  return (
    <>
      <ActionsBar message={message} setMessage={setmessage} />
      {isLoading && <LoadingAnim />}
      {!isLoading && usersList && (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    name="select-all"
                    onChange={(event) =>
                      dispatch(
                        event.target.checked
                          ? selectAllUsers()
                          : deselectAllUsers()
                      )
                    }
                    checked={isAllSelected}
                  />
                </th>
                {columns.map((column) => (
                  <th scope="column" key={column}>
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {usersList.map((user) => (
                <CandidateInfo candidate={user} key={user.id} />
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}
