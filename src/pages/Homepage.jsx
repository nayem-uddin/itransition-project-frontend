import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../assets/universals";
import { updateTemplatesList } from "../features/filter templates/gallerySlice";
import Gallery from "../components/gallery/Gallery";
export default function Homepage() {
  const dispatch = useDispatch();
  useEffect(() => {
    socket.emit("request-templates");
    socket.on("send-templates", (data) => {
      dispatch(updateTemplatesList(data.templates));
    });
  }, []);
  const templates = useSelector(
    (state) => state.galleryReducer.filteredTemplates
  );
  return (
    <div>
      {/* <h1>This is Homepage</h1> */}
      <Gallery templates={templates} />
    </div>
  );
}
