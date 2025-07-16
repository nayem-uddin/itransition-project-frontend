import { ArrowRight } from "react-bootstrap-icons";

export default function RequestToken() {
  return (
    <div>
      <div>
        Want to use all of your templates' details outside of our app? <br />
        Get an API token clicking on the{" "}
        <span className="fw-semibold">Get token</span> button below and use that
        to make API calls.
      </div>
      <button className="btn btn-primary mt-3">
        <a
          className="icon-link icon-link-hover link-light link-underline-opacity-0"
          href="/token-gen"
          target="_blank"
        >
          Get token
          <ArrowRight />
        </a>
      </button>
      <p className="mt-2">
        (Note: The externally accessible API isn't available yet. Therefore, you
        can get tokens, but can't use them to access data.)
      </p>
    </div>
  );
}
