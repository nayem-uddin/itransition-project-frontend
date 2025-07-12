import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import InputField from "../components/subscriber_form/InputField";
import {
  API_URL,
  initialMessage,
  updateMessage,
  waitRequest,
} from "../assets/universals";
import PopupMessage from "../components/template showcase/PopupMessage";
import { useState } from "react";

export default function SubscriberForm() {
  const { register, handleSubmit } = useForm();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(initialMessage);
  function popup(msg) {
    setOpen(true);
    setMessage(msg);
  }
  async function onSubmit(data) {
    popup(waitRequest);
    const res = await fetch(`${API_URL}/oauth2/auth`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const response = await res.json();
    popup(response);
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset
          className="d-flex flex-column mt-5 m-auto"
          style={{ width: "300px" }}
        >
          <InputField register={register} label="Full name" field="Name" />
          <InputField
            register={register}
            label="Country"
            placeholder="Full name of your country"
            field="BillingCountry"
          />
          <InputField
            register={register}
            label="City"
            placeholder="Full name of your city"
            field="BillingCity"
          />
          <Button variant="contained" color="primary" type="submit">
            Register
          </Button>
        </fieldset>
      </form>
      <PopupMessage isOpen={open} setOpen={setOpen} message={message} />
    </div>
  );
}
