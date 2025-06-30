import { useEffect, useState } from "react";
import { socket } from "../../assets/universals";
import PostComment from "./PostComment";
import Comment from "./Comment";
import HandleComment from "./HandleComment";

export default function Comments({ TemplateId, isDisabled, setMessage }) {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    socket.emit("update-comments", TemplateId);
    socket.on("deliver-comments", (data) => {
      setComments(data.comments);
    });
  }, [TemplateId]);
  return (
    <div className="mt-4">
      <p className="h5 mb-0">Comments:</p>
      <caption style={{ textWrap: "nowrap" }}>(Latest first)</caption>
      <PostComment
        TemplateId={TemplateId}
        isDisabled={isDisabled}
        setMessage={setMessage}
      />
      {comments.length === 0 && <p>No comment yet</p>}
      {comments.reverse().map((comm) => (
        <HandleComment key={comm.id} comm={comm} setMessage={setMessage} />
      ))}
    </div>
  );
}
