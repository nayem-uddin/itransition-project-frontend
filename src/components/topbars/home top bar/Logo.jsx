import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <>
      <Link className="navbar-brand text-white" to="/">
        FormEr
      </Link>
    </>
  );
}
