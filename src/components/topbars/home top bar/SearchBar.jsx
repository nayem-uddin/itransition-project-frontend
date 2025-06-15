export default function SearchBar() {
  return (
    <>
      <form className="d-flex m-auto me-0 mt-2" role="search">
        <input
          className="form-control"
          type="search"
          placeholder="Search templates"
          aria-label="Search"
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
    </>
  );
}
