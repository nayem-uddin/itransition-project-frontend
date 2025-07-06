import { FormControl, FormGroup, useColorScheme } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

export default function SwitchTheme() {
  const { mode, setMode } = useColorScheme();
  if (!mode) {
    setMode(localStorage.getItem("theme") ?? "light");
  }
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
