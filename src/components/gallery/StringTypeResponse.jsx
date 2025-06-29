export default function StringTypeResponse({ register, qIdx }) {
  return (
    <div>
      <input type="text" {...register(`${qIdx}`, { required: true })} />
    </div>
  );
}
