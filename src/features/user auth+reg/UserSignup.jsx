import { useForm } from "react-hook-form";
import TextOrEmail from "../../components/form components/TextOrEmail";
import SubmitButton from "../../components/form components/SubmitButton";
import Password from "../../components/form components/Password";
import DisplayError from "../../components/form components/DisplayError";
import { useNavigate } from "react-router-dom";
import { API_URL, delayInms } from "../../assets/universals";
export default function UserSignup() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  async function onSubmit(userData) {
    const res = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    if (!res.ok) {
      setError("root.serverError", { type: res.status, message: data.message });
      setTimeout(() => setError("root.serverError", null), delayInms);
      return;
    }
    ["id", "fullName", "username", "email"].map((prop) =>
      sessionStorage.setItem(prop, data.userInfo[prop])
    );
    navigate("/", { replace: true });
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <legend className="text-center">Sign up</legend>
          <TextOrEmail
            field="fullName"
            type="text"
            register={register}
            label="Full name"
          />
          <TextOrEmail
            field="username"
            type="text"
            register={register}
            label="Username"
          />
          <TextOrEmail
            field="email"
            type="email"
            register={register}
            label="Email"
          />
          <Password register={register} />
          <SubmitButton value="Sign-up" />
          {errors?.root?.serverError && (
            <DisplayError errorMessage={errors.root.serverError.message} />
          )}
        </fieldset>
      </form>
    </div>
  );
}
