import { Autocomplete, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { giveAccess } from "../../../features/template creation/templateSlice";
import { useEffect, useMemo, useState } from "react";
import { socket } from "../../../assets/universals";

export default function ChooseUsers() {
  const dispatch = useDispatch();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [options, setOptions] = useState([]);
  const template = useSelector((state) => state.templateReducer);
  useEffect(() => {
    socket.emit("request-users");
    socket.on("send-users", (data) => {
      setOptions(data.users);
    });
  }, []);
  const userIds = useMemo(() => template?.usersWithAccess ?? [], [template]);

  const [searchCriteria, setSearchCriteria] = useState("username");
  useEffect(() => {
    const users = options.filter((user) => userIds.includes(user.id));
    setSelectedUsers(users);
  }, [options, userIds]);
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
        value={selectedUsers}
        isOptionEqualToValue={(option, value) => option.id == value.id}
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
