import { FormControl, FormGroup } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

export default function SwitchTheme({ setMode, mode }) {
  function handleThemeChange(e) {
    const theme = e.target.checked ? "dark" : "light";
    setMode(theme);
    localStorage.setItem("theme", theme);
  }
  return (
    <>
      <FormControl>
        <FormControlLabel
          control={<Switch onChange={handleThemeChange} />}
          label="Dark mode"
          sx={{ textWrap: "nowrap", color: "white" }}
          checked={mode === "dark"}
        />
      </FormControl>
    </>
  );
}
