import { useEffect, useMemo, useState } from "react";
import { socket } from "../assets/universals";
import Gallery from "./gallery/Gallery";
import { Autocomplete, TextField } from "@mui/material";
export default function Tagcloud({ templates }) {
  const [allTags, setAllTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const filteredByTags = useMemo(
    () =>
      selectedTags.length === 0
        ? templates
        : templates.filter((template) =>
            selectedTags.every((tag) => template.tags.includes(tag))
          ),
    [templates, selectedTags]
  );
  useEffect(() => {
    socket.emit("request-tags");
    socket.on("send-tags", (data) => setAllTags(data.tagnames));
  }, []);
  function handleChange(event, value) {
    setSelectedTags(value);
  }
  return (
    <>
      <Autocomplete
        multiple
        options={allTags}
        getOptionLabel={(option) => option}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField {...params} placeholder="Choose or search tags" />
        )}
      />
      <Gallery templates={filteredByTags} />
    </>
  );
}
