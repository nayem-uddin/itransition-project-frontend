import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="fixed-bottom ms-5">
      <p>
        Want to get notified about our latest services?{" "}
        <Link to="/subscriber-register">Subscribe</Link>
      </p>
      <p>Need help?</p>
    </footer>
  );
}
