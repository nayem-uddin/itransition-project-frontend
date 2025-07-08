import { Send } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import {
  API_URL,
  delayInms,
  initialMessage,
  socket,
  updateMessage,
  waitRequest,
} from "../../assets/universals";
import { useNavigate } from "react-router-dom";
export default function PostComment({ TemplateId, isDisabled, setMessage }) {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  async function onSubmit(data, event) {
    event.preventDefault();
    const comment = {
      UserId: sessionStorage.getItem("id"),
      TemplateId,
      ...data,
    };
    setMessage(waitRequest);
    const res = await fetch(`${API_URL}/comment`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(comment),
    });
    const message = await res.json();
    updateMessage(setMessage, message);
    if (res.ok) {
      socket.emit("update-comments", TemplateId);
      reset();
      setMessage(initialMessage);
    } else if ([403, 404].includes(res.status)) {
      setTimeout(() => {
        navigate("/", { replace: true });
        sessionStorage.clear();
        location.reload();
      }, delayInms);
    }
  }
  return (
    <div className="mb-3">
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <TextField
            variant="standard"
            label="Your opinion about this template"
            disabled={isDisabled}
            {...register("comment")}
            multiline
            fullWidth
          />
          <Button
            variant="contained"
            endIcon={<Send />}
            type="submit"
            className="mt-2"
            size="small"
            disabled={isDisabled}
          >
            post
          </Button>
        </fieldset>
      </form>
    </div>
  );
}
