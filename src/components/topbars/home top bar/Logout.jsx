import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();
  function logout() {
    sessionStorage.clear();
    navigate("/", { replace: true });
    location.reload();
  }
  return (
    <>
      <button
        type="button"
        className="btn btn-outline-danger ms-2"
        onClick={logout}
      >
        Logout
      </button>
    </>
  );
}
