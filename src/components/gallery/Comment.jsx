import { Box, Button, ClickAwayListener, IconButton } from "@mui/material";
import { useState } from "react";
import { ThreeDots } from "react-bootstrap-icons";

export default function Comment({ comm, setEditMode, deleteComment }) {
  const { comment, User } = comm;
  const [showOptions, setShowOptions] = useState(false);
  const styles = {
    position: "absolute",
    top: 28,
    right: 0,
    left: 30,
    zIndex: 1,
    bgcolor: "background.paper",
  };

  return (
    <div className="d-flex justify-content-between">
      <div>
        <span className="h6">{User.fullName} </span>said:
        <p>{comment}</p>
      </div>
      <div>
        {comm.UserId == sessionStorage.getItem("id") && (
          <ClickAwayListener onClickAway={() => setShowOptions(false)}>
            <Box sx={{ position: "relative" }}>
              <IconButton onClick={() => setShowOptions((prev) => !prev)}>
                <ThreeDots />
              </IconButton>
              {showOptions && (
                <Box sx={styles}>
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
                </Box>
              )}
            </Box>
          </ClickAwayListener>
        )}
      </div>
    </div>
  );
}
