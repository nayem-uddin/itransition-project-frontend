import { useForm } from "react-hook-form";
import Password from "../components/form components/Password";
import TextOrEmail from "../components/form components/TextOrEmail";
import SubmitButton from "../components/form components/SubmitButton";
import { useNavigate } from "react-router-dom";
import DisplayError from "../components/form components/DisplayError";
import { API_URL } from "../assets/API URL";

export default function AdminPortal() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  async function onSubmit(credentials) {
    const res = await fetch(`${API_URL}/admin-login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    const data = await res.json();
    if (!res.ok) {
      setError("root.serverError", { type: res.status, message: data.message });
      setTimeout(() => setError("root.serverError", null), 3000);
      return;
    }
    sessionStorage.setItem("isAdmin", true);
    ["id", "fullName", "username", "email"].map((prop) =>
      sessionStorage.setItem(prop, data.adminInfo[prop])
    );
    navigate("/", { replace: true });
  }
  return (
    <div style={{ width: "300px" }} className="m-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <legend className="text-center">Admin sign-in</legend>
          <TextOrEmail
            register={register}
            field={"email"}
            label={"Email"}
            type={"email"}
          />
          <Password register={register} />
          <SubmitButton value={"Sign-in"} />
          {errors?.root?.serverError && (
            <DisplayError errorMessage={errors.root.serverError.message} />
          )}
        </fieldset>
      </form>
    </div>
  );
}
