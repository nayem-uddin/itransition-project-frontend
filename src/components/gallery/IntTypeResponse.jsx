export default function IntTypeResponse({ min, max }) {
  return (
    <div>
      <input type="range" min={Number(min)} max={Number(max)} />
    </div>
  );
}
