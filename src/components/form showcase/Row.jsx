import {
  KeyboardArrowDownOutlined,
  KeyboardArrowUpOutlined,
} from "@mui/icons-material";
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";

export default function Row({ row }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand-row"
            size="small"
            onClick={() => setOpen((prev) => !prev)}
          >
            {open ? <KeyboardArrowUpOutlined /> : <KeyboardArrowDownOutlined />}
          </IconButton>
        </TableCell>
        <TableCell>{row.title}</TableCell>
        <TableCell>{row.author}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={3}>
          <Collapse in={open}>
            <Box>
              <Typography variant="h6" gutterBottom>
                Preview
              </Typography>
              <Table size="small" aria-label="preview">
                {row.questions.map((q) => (
                  <TableRow>{}</TableRow>
                ))}
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
