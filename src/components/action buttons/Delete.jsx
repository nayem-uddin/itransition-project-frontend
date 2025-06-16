import { Trash3Fill } from "react-bootstrap-icons";
export default function Delete({ handleClick, items }) {
  return (
    <>
      <button
        onClick={handleClick}
        className="btn btn-outline-danger ms-2"
        toggle="tooltip"
        placement="bottom"
        title={`Delete selected ${items}`}
      >
        <Trash3Fill />
      </button>
    </>
  );
}
