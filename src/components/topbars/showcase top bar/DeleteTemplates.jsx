import { Delete } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import {
  API_URL,
  delayInms,
  notifyUpdate,
  updateMessage,
  waitRequest,
} from "../../../assets/universals";
import { useNavigate } from "react-router-dom";
export default function DeleteTemplates({ templateIds, setMessage, setOpen }) {
  const navigate = useNavigate();
  const path = location.pathname;
  async function templatesDelete() {
    setOpen(true);
    setMessage(waitRequest);
    const reqBody = { templateIds };
    let endpoint;
    let credentialsParam;
    if (path === "/user-dashboard") {
      Object.assign(reqBody, { UserId: sessionStorage.getItem("id") });
      endpoint = "templates";
      credentialsParam = "omit";
    } else {
      endpoint = "templates-manipulate";
      credentialsParam = "include";
    }

    const res = await fetch(`${API_URL}/${endpoint}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
      credentials: credentialsParam,
      body: JSON.stringify(reqBody),
    });
    const data = await res.json();
    updateMessage(setMessage, data);
    if (res.ok) {
      notifyUpdate();
    } else if ([403, 404].includes(res.status)) {
      setTimeout(() => {
        navigate("/", { replace: true });
        sessionStorage.clear();
        location.reload();
      }, delayInms);
    }
  }
  return (
    <>
      <Tooltip title="Permanently delete selected templates">
        <IconButton color="error" onClick={() => templatesDelete()}>
          <Delete />
        </IconButton>
      </Tooltip>
    </>
  );
}
