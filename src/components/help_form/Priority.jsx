import { Box, InputLabel, MenuItem, Select } from "@mui/material";

import { Controller } from "react-hook-form";

export default function Priority({ control }) {
  return (
    <Box sx={{ mt: 2, mb: 2 }}>
      <InputLabel>Priority</InputLabel>
      <Controller
        name="priority"
        control={control}
        defaultValue={"Low"}
        render={({ field }) => (
          <Select {...field}>
            {["High", "Average", "Low"].map((pValue) => (
              <MenuItem value={pValue}>{pValue}</MenuItem>
            ))}
          </Select>
        )}
      />
    </Box>
  );
}
