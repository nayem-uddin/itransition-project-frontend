import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../assets/universals";
import { updateCreatedTemplates } from "./createdTemplatesSlice";
import Showcase from "./Showcase";

export default function ViewTemplates() {
  const dispatch = useDispatch();
  useEffect(() => {
    socket.emit("request-created-templates", sessionStorage.getItem("id"));
    socket.on("get-created-templates", (data) => {
      dispatch(updateCreatedTemplates(data.templates));
    });
  }, []);
  const templates = useSelector(
    (state) => state.createdTemplatesReducer.filteredTemplates
  );
  return (
    <div>
      <Showcase templates={templates} />
    </div>
  );
}
