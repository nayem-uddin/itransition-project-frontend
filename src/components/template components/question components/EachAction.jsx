import { ListItem, ListItemButton, ListItemIcon, Tooltip } from "@mui/material";
export default function EachAction({ tooltip, icon, action }) {
  return (
    <>
      <ListItem disablePadding>
        <Tooltip title={tooltip}>
          <ListItemButton onClick={action}>
            <ListItemIcon>{icon}</ListItemIcon>
          </ListItemButton>
        </Tooltip>
      </ListItem>
    </>
  );
}
