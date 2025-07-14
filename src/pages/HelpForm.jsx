import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import Summary from "../components/help_form/Summary";
import ReportedBy from "../components/help_form/ReportedBy";
import TemplateTitle from "../components/help_form/TemplateTitle";
import Priority from "../components/help_form/Priority";
import { useState } from "react";
import { API_URL, initialMessage, waitRequest } from "../assets/universals";
import PopupMessage from "../components/template showcase/PopupMessage";
export default function HelpForm() {
  const loc = useLocation();
  const link = loc.state;
  const [message, setMessage] = useState(initialMessage);
  const [open, setOpen] = useState(false);
  const { handleSubmit, register, control } = useForm({
    defaultValues: {
      "reported by": sessionStorage.getItem("fullName") ?? "",
      template: "",
    },
  });
  function popup(msg) {
    setOpen(true);
    setMessage(msg);
  }
  async function onSubmit(data) {
    popup(waitRequest);
    Object.assign(data, { link });
    const res = await fetch(`${API_URL}/report`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const msg = await res.json();
    popup(msg);
  }
  return (
    <div className="d-flex justify-content-center mt-5">
      <PopupMessage isOpen={open} setOpen={setOpen} message={message} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <ReportedBy register={register} />
          <TemplateTitle register={register} />
          <Summary register={register} />
          <Priority control={control} />
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </fieldset>
      </form>
    </div>
  );
}
