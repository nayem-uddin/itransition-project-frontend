import { ThumbUp } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import {
  API_URL,
  delayInms,
  socket,
  updateMessage,
} from "../../assets/universals";
import { useNavigate } from "react-router-dom";

export default function Likes({ templateId, setMessage, isDisabled }) {
  const [likeState, setLikeState] = useState(false);
  const [likes, setLikes] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    socket.emit("update-likes", templateId);
    socket.on("deliver-likes", (data) => {
      setLikes(data.likes);
    });
  }, [templateId]);
  async function handleLike(e) {
    const increment = likeState ? -1 : 1;
    const res = await fetch(`${API_URL}/like`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        UserId: sessionStorage.getItem("id"),
        templateId,
        increment,
      }),
    });
    const data = await res.json();
    updateMessage(setMessage, data);
    if (res.ok) {
      socket.emit("update-likes", templateId);
      setLikeState((prev) => !prev);
    } else if ([403, 404].includes(res.status)) {
      setTimeout(() => {
        navigate("/", { replace: true });
        sessionStorage.clear();
        location.reload();
      }, delayInms);
    }
  }
  return (
    <div>
      <Button
        variant={likeState ? "contained" : "outlined"}
        startIcon={<ThumbUp />}
        onClick={handleLike}
        disabled={isDisabled}
      >
        {likes}
      </Button>
    </div>
  );
}
