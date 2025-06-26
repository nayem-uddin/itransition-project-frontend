import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../assets/universals";
import { updateCreatedTemplates } from "../user dashboard/createdTemplatesSlice";
import Showcase from "../user dashboard/Showcase";

export default function AdminsTemplateShowcase() {
  const dispatch = useDispatch();
  const templates = useSelector(
    (state) => state.createdTemplatesReducer.filteredTemplates
  );
  useEffect(() => {
    socket.emit("request-templates");
    socket.on("send-templates", (data) => {
      dispatch(updateCreatedTemplates(data.templates));
    });
  }, []);

  return (
    <div>
      <Showcase templates={templates} />
    </div>
  );
}
