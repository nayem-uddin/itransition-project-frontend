import { useState } from "react";
import DisplayMessage from "../../DisplayMessage";
import DeleteTemplates from "./DeleteTemplates";
import {
  delayInms,
  initialMessage,
  waitRequest,
} from "../../../assets/universals";
import { IconButton, Snackbar } from "@mui/material";
import { Close, CloseOutlined } from "@mui/icons-material";
import { X } from "react-bootstrap-icons";

export default function ShowcaseTopBar({ templateIds }) {
  const [message, setMessage] = useState(initialMessage);
  const [open, setOpen] = useState(false);
  const action = (
    <>
      <IconButton onClick={() => setOpen(false)}>
        <Close sx={{ color: "white" }} />
      </IconButton>
    </>
  );
  return (
    <div className="d-flex flex-column">
      <DeleteTemplates
        templateIds={templateIds}
        setMessage={setMessage}
        setOpen={setOpen}
      />
      <Snackbar
        open={open}
        autoHideDuration={delayInms}
        message={message.text ?? message.message}
        onClose={() => setOpen(false)}
        action={action}
      />
    </div>
  );
}
