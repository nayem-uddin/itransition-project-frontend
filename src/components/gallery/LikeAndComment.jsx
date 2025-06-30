import { useState } from "react";
import Likes from "./Likes";
import DisplayMessage from "../DisplayMessage";
import { initialMessage } from "../../assets/universals";
import Comments from "./Comments";

export default function LikeAndComment({ templateId }) {
  const [message, setMessage] = useState(initialMessage);
  const isDisabled = !sessionStorage.getItem("id");
  return (
    <div className="d-flex flex-column">
      <Likes
        templateId={templateId}
        setMessage={setMessage}
        isDisabled={isDisabled}
      />
      <DisplayMessage message={message} />
      <Comments
        TemplateId={templateId}
        isDisabled={isDisabled}
        setMessage={setMessage}
      />
    </div>
  );
}
