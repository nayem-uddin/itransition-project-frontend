import { useState } from "react";

export default function Password({ register }) {
  const [passVisibility, setPassVisibility] = useState(false);
  return (
    <>
      <label htmlFor="password" className="mt-2">
        Password
      </label>
      <input
        type={passVisibility ? "text" : "password"}
        name="password"
        id="password"
        className="form-control border border-dark-subtle"
        {...register("password", { required: true })}
      />
      <input
        type="checkbox"
        name="show-pass"
        onChange={(e) => setPassVisibility(e.target.checked)}
      />
      &nbsp; Show password
    </>
  );
}
