import { useForm } from "react-hook-form";
import SubmitButton from "../../components/form components/SubmitButton";
import Password from "../../components/form components/Password";
import TextOrEmail from "../../components/form components/TextOrEmail";
import DisplayError from "../../components/form components/DisplayError";
import { useNavigate } from "react-router-dom";
import {
  API_URL,
  delayInms,
  socket,
  waitRequest,
} from "../../assets/universals";
export default function UserLogin() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  async function onSubmit(credentials) {
    setError("root.serverError", {
      type: waitRequest.type,
      message: waitRequest.text,
    });
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    const data = await res.json();
    if (!res.ok) {
      setError("root.serverError", { type: res.status, message: data.message });
      setTimeout(() => setError("root.serverError", null), delayInms);
      return;
    }
    socket.emit("user-entry", data.userInfo.id);
    ["id", "fullName", "username", "email"].map((prop) =>
      sessionStorage.setItem(prop, data.userInfo[prop])
    );
    navigate("/", { replace: true });
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <legend className="text-center">Login</legend>
          <TextOrEmail
            field="email"
            type="email"
            label="Email"
            register={register}
          />
          <Password register={register} />
          <SubmitButton value="Login" />
          {errors?.root?.serverError && (
            <DisplayError errorMessage={errors.root.serverError.message} />
          )}
        </fieldset>
      </form>
    </div>
  );
}
