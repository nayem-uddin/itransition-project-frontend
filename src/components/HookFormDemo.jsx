import { useForm } from "react-hook-form";

export default function HookFormDemo() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  function onSubmit(data) {
    console.log(data);
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("firstName", { required: true })} /> <br />
        <input {...register("lastName", { required: true })} /> <br />
        {/* {errors.exampleRequired && <span>Required</span>} */}
        <input type="checkbox" {...register("choices")} value="option 1" />{" "}
        option 1 <br />
        <input type="checkbox" {...register("choices")} value="option 2" />{" "}
        option 2 <br />
        <input type="checkbox" {...register("choices")} value="option 3" />{" "}
        option 3 <br />
        <input type="checkbox" {...register("choices")} value="option 4" />{" "}
        option 4 <br />
        <input type="submit" />
      </form>
    </div>
  );
}
