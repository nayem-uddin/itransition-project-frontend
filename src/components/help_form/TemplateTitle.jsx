import { Box, FormControl, InputLabel, TextField } from "@mui/material";

export default function TemplateTitle({ register }) {
  return (
    <Box sx={{ mt: 2 }}>
      <InputLabel>Template Title (if applicable)</InputLabel>
      <TextField
        placeholder="For template related issues"
        {...register("template")}
      />
    </Box>
  );
}
