import { Autocomplete, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { giveAccess } from "../../../features/template creation/templateSlice";
import { useEffect, useState } from "react";
import { socket } from "../../../assets/universals";

export default function ChooseUsers() {
  const dispatch = useDispatch();
  const userIds =
    useSelector((state) => state.templateReducer?.usersWithAccess) ?? [];
  const [searchCriteria, setSearchCriteria] = useState("username");
  const [options, setOptions] = useState([]);
  useEffect(() => {
    socket.emit("request-users");
    socket.on("send-users", (data) => {
      setOptions(data.users);
    });
  }, []);
  const users = options.filter((user) => userIds.includes(user.id));
  function handleChange(event, value) {
    const userIds = value.map((user) => user.id);
    dispatch(giveAccess(userIds));
  }
  return (
    <div className="mb-3">
      <label htmlFor="user-choice">Give access to </label>
      <Autocomplete
        multiple
        onChange={handleChange}
        options={options}
        defaultValue={users.map((user) => user[searchCriteria])}
        getOptionLabel={(option) => option[searchCriteria]}
        renderInput={(params) => (
          <TextField {...params} placeholder="Find user" />
        )}
      />
      <label htmlFor="user-sorting">Find users by &nbsp;</label>
      <select
        name="user-sorting"
        value={searchCriteria}
        onChange={(e) => setSearchCriteria(e.target.value)}
      >
        <option value="username">Username</option>
        <option value="email">Email</option>
      </select>
    </div>
  );
}
