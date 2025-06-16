import { Unlock2Fill } from "react-bootstrap-icons";
export default function Unblock({ handleClick, items }) {
  return (
    <>
      <button
        className="btn btn-success ms-2"
        toggle="tooltip"
        placement="bottom"
        title={`Unblock selected ${items}`}
        onClick={handleClick}
      >
        <Unlock2Fill />
      </button>
    </>
  );
}
