import { Box, FormControl, InputLabel, TextareaAutosize } from "@mui/material";

export default function Summary({ register }) {
  return (
    <Box sx={{ mt: 2 }}>
      <InputLabel>Summary</InputLabel>
      <FormControl fullWidth>
        <TextareaAutosize
          placeholder="Explain your issue"
          {...register("summary")}
          required
          className="p-2"
        />
      </FormControl>
    </Box>
  );
}
