import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";

export default function UserInfo() {
  const fields = ["ID", "Full name", "Username", "Email ID"];
  const props = ["id", "fullName", "username", "email"];
  return (
    <TableContainer>
      <Table>
        <TableBody>
          {fields.map((field, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {field}
              </TableCell>
              <TableCell>{sessionStorage.getItem(props[index])}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
