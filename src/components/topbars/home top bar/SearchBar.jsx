import { useState } from "react";
import { useDispatch } from "react-redux";
import { filterBySearch } from "../../../features/filter templates/gallerySlice";
import { filterTemplatesBySearch } from "../../../features/user dashboard/createdTemplatesSlice";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");
  const pathname = location.pathname;
  function handleChange(e) {
    const query = e.target.value;
    setKeyword(query);
    dispatch(
      pathname === "/user-dashboard"
        ? filterTemplatesBySearch(query)
        : filterBySearch(query)
    );
  }
  return (
    <>
      <form
        role="search"
        className="position-absolute top-0 start-50 translate-middle-x"
      >
        <input
          className="form-control"
          type="search"
          placeholder="Search templates"
          aria-label="Search"
          onChange={handleChange}
          value={keyword}
        />
      </form>
    </>
  );
}
