import { Ban } from "react-bootstrap-icons";
export default function Block({ handleClick, items }) {
  return (
    <>
      <button
        onClick={handleClick}
        className="btn btn-danger"
        toggle="tooltip"
        placement="bottom"
        title={`Block selected ${items}`}
      >
        <Ban />
      </button>
    </>
  );
}
