import { Box, Button, IconButton, Popover } from "@mui/material";
import { useState } from "react";
import { ThreeDots } from "react-bootstrap-icons";

export default function Comment({ comm, setEditMode, deleteComment }) {
  const { comment, User } = comm;
  const [anchorEl, setAnchorEl] = useState(null);

  function handleClick(e) {
    setAnchorEl(e.currentTarget);
  }
  function handleClose() {
    setAnchorEl(null);
  }
  return (
    <div className="d-flex justify-content-between">
      <div>
        <span className="h6">{User.fullName} </span>said:
        <p>{comment}</p>
      </div>
      <div>
        {comm.UserId == sessionStorage.getItem("id") && (
          <Box>
            <IconButton onClick={handleClick}>
              <ThreeDots />
            </IconButton>
            <Popover
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorEl={anchorEl}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            >
              <Button size="small" onClick={() => setEditMode(true)}>
                edit
              </Button>
              <Button
                size="small"
                color="error"
                onClick={() => deleteComment()}
              >
                delete
              </Button>
            </Popover>
          </Box>
        )}
      </div>
    </div>
  );
}
