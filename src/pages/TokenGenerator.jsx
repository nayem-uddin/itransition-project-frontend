import { useEffect, useState } from "react";
import { API_URL } from "../assets/universals";
import { ContentCopy } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";

export default function TokenGenerator() {
  const [token, setToken] = useState("");
  const [tooltip, setTooltip] = useState("Copy token to clipboard");
  useEffect(() => {
    async function getToken() {
      const res = await fetch(`${API_URL}/token`);
      const data = await res.json();
      setToken(data.token);
    }
    getToken();
  }, []);
  function copyToken() {
    navigator.clipboard.writeText(token);
    setTooltip("Token copied");
    setTimeout(() => setTooltip("Copy token to clipboard"), 10000);
  }
  return (
    <div className="text-center">
      <p className="lead">Your token is</p>
      <p className="h4 fw-bold text-break">
        {token}
        <Tooltip title={tooltip}>
          <IconButton onClick={copyToken}>
            <ContentCopy />
          </IconButton>
        </Tooltip>
      </p>
      <p>Use this token to access your templates' data</p>
    </div>
  );
}
