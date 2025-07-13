import { Box, InputLabel, TextField } from "@mui/material";

export default function ReportedBy({ register }) {
  return (
    <Box>
      <InputLabel>Full name</InputLabel>
      <TextField
        variant="outlined"
        placeholder="Enter your full name"
        {...register("reported by")}
        required
      />
    </Box>
  );
}
