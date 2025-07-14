import { Autocomplete, Box, InputLabel, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { API_URL } from "../../assets/universals";

export default function Country({ control }) {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function getCountries() {
      setLoading(true);
      const res = await fetch(`${API_URL}/countries`);
      const data = await res.json();
      setCountries(data);
      setLoading(false);
    }
    getCountries();
  }, []);
  return (
    <Box>
      <Controller
        name="BillingCountry"
        control={control}
        render={({ field: { onChange, value, ref } }) => (
          <Autocomplete
            options={countries}
            renderInput={(params) => (
              <TextField {...params} label="Country" inputRef={ref} required />
            )}
            loading={loading}
            value={value || ""}
            onChange={(event, newValue) => onChange(newValue)}
          />
        )}
      />
    </Box>
  );
}
