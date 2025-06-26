import { useEffect, useState } from "react";
import { API_URL, delayInms } from "../../assets/universals";
import { useNavigate } from "react-router-dom";
import AdminInfo from "./AdminInfo";
import { useDispatch, useSelector } from "react-redux";
import { deselectAll, selectAll } from "./manageSlice";
import Actions from "../../components/topbars/admin top bar/admin access/Actions";
import LoadingAnim from "../../components/LoadingAnim";
import { getAllAdmins } from "./handleAdminsAPI";
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
    setmessage({ ...feedback });
    setTimeout(() => {
      setmessage({ text: "", type: null });
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
        <>
          <Actions message={message} setMessage={setmessage} />
          <table className="table">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    name="select-all"
                    onChange={(event) =>
                      dispatch(
                        event.target.checked ? selectAll() : deselectAll()
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
              {adminsList.map((admin) => (
                <AdminInfo adminInfo={admin} key={admin.id} />
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
