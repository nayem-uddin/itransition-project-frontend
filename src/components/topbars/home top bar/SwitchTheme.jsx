import { FormControl, FormGroup, useColorScheme } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { Link } from "react-router-dom";
export default function SwitchTheme() {
  const path = location.pathname;
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
    <nav className="nav justify-content-end bg-primary">
      {path.includes("dashboard") && (
        <p style={{ color: "white" }} className="m-auto">
          Want to have our other services?{" "}
          <Link to="/subscriber-register" style={{ color: "white" }}>
            Subscribe
          </Link>
        </p>
      )}
      <FormControl>
        <FormControlLabel
          control={<Switch onChange={handleThemeChange} />}
          label="Dark mode"
          sx={{ textWrap: "nowrap", color: "white" }}
          checked={mode === "dark"}
        />
      </FormControl>
    </nav>
  );
}
