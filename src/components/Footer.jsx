import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  function redirect() {
    navigate("/report", { state: location.pathname });
  }
  return (
    <footer className="fixed-bottom ms-5">
      <button type="button" className="btn btn-link" onClick={redirect}>
        Report an issue
      </button>
    </footer>
  );
}
