import { Send } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import {
  API_URL,
  initialMessage,
  socket,
  updateMessage,
  waitRequest,
} from "../../assets/universals";
export default function EditComment({ setMessage, comm, setEditMode }) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      comment: comm.comment,
    },
  });
  async function onSubmit(data, event) {
    event.preventDefault();
    const comment = {
      id: comm.id,
      TemplateId: comm.TemplateId,
      UserId: comm.UserId,
      ...data,
    };
    setMessage(waitRequest);
    const res = await fetch(`${API_URL}/comment`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(comment),
    });
    const message = await res.json();
    if (res.ok) {
      socket.emit("update-comments", comm.TemplateId);
      reset();
      setEditMode(false);
      setMessage(initialMessage);
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
            {...register("comment")}
            multiline
            fullWidth
          />
          <div className="d-flex align-items-center mt-2">
            <Button
              color="error"
              variant="text"
              onClick={() => setEditMode(false)}
            >
              cancel
            </Button>
            <Button variant="contained" type="submit" size="small">
              update
            </Button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}
