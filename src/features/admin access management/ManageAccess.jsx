import { useEffect, useState } from "react";
import { API_URL } from "../../assets/API URL";
import { useNavigate } from "react-router-dom";
import AdminInfo from "./AdminInfo";
import LoadingAnim from "../../components/LoadingAnim";
import { useDispatch, useSelector } from "react-redux";
import { deselectAll, selectAll } from "./manageSlice";
import Actions from "../../components/topbars/admin top bar/Actions";

export default function ManageAccess() {
  const dispatch = useDispatch();
  const selectionList = useSelector(
    (state) => state.adminAccessReducer.selectedAdmins
  );
  const feedback = useSelector((state) => state.adminAccessReducer.message);
  const columns = ["ID", "Full name", "Username", "Email", "Status"];
  const [adminsList, setAdminsList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [message, setmessage] = useState({ text: feedback, type: null });
  const navigate = useNavigate();
  const isAllSelected = adminsList.length === selectionList.length;
  useEffect(() => {
    setmessage({ text: feedback, type: "confirmation" });
    setTimeout(() => setmessage({ text: "", type: null }), 3000);
  }, [feedback]);
  useEffect(() => {
    async function admins() {
      if (!sessionStorage.getItem("adminsList")) {
        setLoading(true);
        const res = await fetch(`${API_URL}/admins`);
        const data = await res.json();
        setLoading(false);
        if (!res.ok) {
          setmessage({
            text: data?.message ?? "Error loading data",
            type: "error",
          });
          setTimeout(() => setmessage({ text: "", type: null }), 3000);
          return;
        }
        const fetchedList = data.adminsList;
        sessionStorage.setItem("adminsList", JSON.stringify(fetchedList));
      }
      const currentAdminsList = JSON.parse(
        sessionStorage.getItem("adminsList")
      );
      const currentAdminIndex = currentAdminsList.findIndex(
        (admin) => admin.id == sessionStorage.getItem("id")
      );
      if (
        currentAdminIndex === -1 ||
        currentAdminsList[currentAdminIndex].status === "blocked"
      ) {
        setmessage({ text: "You have no more admin access", type: "error" });
        setTimeout(() => {
          setmessage({ text: "", type: null });
          sessionStorage.clear();
          navigate("/");
          location.reload();
        }, 3000);
        return;
      }
      setAdminsList([...currentAdminsList]);
    }
    admins();
  }, [sessionStorage.getItem("adminsList")]);
  return (
    <>
      {isLoading && <LoadingAnim />}
      {adminsList && (
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
    </>
  );
}
