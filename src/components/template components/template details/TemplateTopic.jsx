import { Autocomplete, InputLabel, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setTemplateProp } from "../../../features/template creation/templateSlice";
import { useEffect, useState } from "react";
import { socket } from "../../../assets/universals";

export default function TemplateTopic() {
  const [options, setOptions] = useState([]);
  const topic = useSelector((state) => state.templateReducer.topic);
  const dispatch = useDispatch();
  function handleChange(event, value) {
    dispatch(setTemplateProp({ field: "topic", value }));
  }
  useEffect(() => {
    socket.emit("request-topics");
    socket.on("send-topics", (data) => setOptions(data.topics));
  }, []);
  return (
    <div className="mb-3">
      <InputLabel id="topic">Topic:</InputLabel>
      <Autocomplete
        value={topic}
        onChange={handleChange}
        options={options}
        getOptionLabel={(option) => option}
        renderInput={(params) => (
          <TextField {...params} placeholder="Choose a topic" />
        )}
      />
    </div>
  );
}
