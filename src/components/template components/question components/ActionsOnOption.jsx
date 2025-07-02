import { Delete, Edit } from "@mui/icons-material";
import {
  Box,
  ClickAwayListener,
  IconButton,
  List,
  Popover,
  Popper,
  Tooltip,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Button,
} from "@mui/material";
import EachAction from "./EachAction";
import { useState } from "react";
import { ThreeDots } from "react-bootstrap-icons";
export default function ActionsOnOption({ setEditMode, deleteAction }) {
  const [anchorEl, setAnchorEl] = useState(null);
  function handleEditMode() {
    handleClose();
    setTimeout(() => setEditMode(true), 0);
  }
  function handleClose() {
    setAnchorEl(null);
  }
  function handleClick(e) {
    setAnchorEl(e.currentTarget);
  }
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : null;
  return (
    <div>
      <Box>
        <Tooltip title="Actions">
          <IconButton onClick={handleClick} aria-describedby={id}>
            <ThreeDots />
          </IconButton>
        </Tooltip>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
        >
          <List sx={{ width: "60px" }} dense>
            <EachAction
              icon={<Edit />}
              tooltip={"Edit"}
              action={handleEditMode}
            />
            <EachAction
              icon={<Delete />}
              tooltip={"Delete"}
              action={() => deleteAction()}
            />
          </List>
        </Popover>
      </Box>
    </div>
  );
}
