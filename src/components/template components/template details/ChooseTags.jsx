import { Autocomplete, InputLabel, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTags } from "../../../features/template creation/templateSlice";
import { socket } from "../../../assets/universals";

export default function ChooseTags() {
  const [options, setOptions] = useState([]);
  const dispatch = useDispatch();
  const tags = useSelector((state) => state.templateReducer.tags);
  function handleChange(event, value) {
    dispatch(setTags(value));
  }
  useEffect(() => {
    socket.emit("request-tags");
    socket.on("send-tags", (data) => setOptions(data.tagnames));
  }, []);
  return (
    <div>
      <InputLabel id="tags">Tags:</InputLabel>
      <Autocomplete
        multiple
        freeSolo
        options={options}
        getOptionLabel={(option) => option}
        onChange={handleChange}
        defaultValue={tags}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Choose or write a tag (press Enter after writing a tag)"
          />
        )}
      />
    </div>
  );
}
