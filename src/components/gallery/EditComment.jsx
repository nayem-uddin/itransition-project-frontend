import { Send } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { API_URL, socket, updateMessage } from "../../assets/universals";
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
          <Button
            variant="contained"
            endIcon={<Send />}
            type="submit"
            className="mt-2"
            size="small"
          >
            update
          </Button>
        </fieldset>
      </form>
    </div>
  );
}
