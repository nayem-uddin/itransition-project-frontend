import { useState } from "react";
import Comment from "./Comment";
import EditComment from "./EditComment";
import { socket, updateMessage, API_URL } from "../../assets/universals";

export default function HandleComment({ comm, setMessage }) {
  const [editMode, setEditMode] = useState(false);
  async function deleteComment() {
    const res = await fetch(`${API_URL}/comment`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(comm),
    });
    const message = await res.json();
    if (res.ok) {
      socket.emit("update-comments", comm.TemplateId);
    } else {
      updateMessage(setMessage, message);
    }
  }
  return (
    <div>
      {editMode ? (
        <div>
          <EditComment
            setEditMode={setEditMode}
            setMessage={setMessage}
            comm={comm}
          />
        </div>
      ) : (
        <Comment
          comm={comm}
          setEditMode={setEditMode}
          deleteComment={deleteComment}
        />
      )}
    </div>
  );
}
