import TextField from "@mui/material/TextField";
export default function InputField({ register, label, field, placeholder }) {
  return (
    <TextField
      variant="outlined"
      label={label}
      {...register(field)}
      className="mb-3"
      required
      placeholder={placeholder}
    />
  );
}
