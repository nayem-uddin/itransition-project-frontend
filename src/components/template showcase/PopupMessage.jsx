import { Close } from "@mui/icons-material";
import { IconButton, Snackbar } from "@mui/material";
import { delayInms } from "../../assets/universals";

export default function PopupMessage({ message, isOpen, setOpen }) {
  const Action = (
    <>
      <IconButton
        size="small"
        onClick={() => setOpen(false)}
        aria-label="close"
      >
        <Close fontSize="small" />
      </IconButton>
    </>
  );
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={isOpen}
        autoHideDuration={delayInms}
        onClose={() => setOpen(false)}
        action={Action}
        message={message.text ?? message.message}
      ></Snackbar>
    </div>
  );
}
