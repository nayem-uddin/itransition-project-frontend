import { Send } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { API_URL, socket, updateMessage } from "../../assets/universals";
export default function PostComment({ TemplateId, isDisabled, setMessage }) {
  const { register, handleSubmit, reset } = useForm();
  async function onSubmit(data, event) {
    event.preventDefault();
    const comment = {
      UserId: sessionStorage.getItem("id"),
      TemplateId,
      ...data,
    };
    const res = await fetch(`${API_URL}/comment`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(comment),
    });
    const message = await res.json();
    if (res.ok) {
      socket.emit("update-comments", TemplateId);
      reset();
    } else {
      updateMessage(setMessage, message);
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
