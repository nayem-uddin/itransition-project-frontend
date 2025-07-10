import { DataGrid } from "@mui/x-data-grid";
import { Box, styled, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Markdown from "react-markdown";
import { useEffect, useState } from "react";
import { socket } from "../../assets/universals";

export default function Allforms() {
  const navigate = useNavigate();
  const [forms, setForms] = useState([]);
  useEffect(() => {
    socket.emit("request-sent-forms", sessionStorage.getItem("id"));
    socket.on("deliver-sent-forms", (data) => {
      setForms(data.forms);
    });
  }, []);
  function handleClick(params, event, details) {
    const idx = forms.findIndex((template) => template.id === params.id);
    navigate("/form", {
      state: forms[idx],
    });
  }
  function defineColumn(field, headerName, flex) {
    return {
      field,
      headerName,
      flex,
      renderCell: (params) => (
        <Tooltip title="Click to edit form">
          <Box>
            <Markdown>{params.row.Template[field]}</Markdown>
          </Box>
        </Tooltip>
      ),
    };
  }
  const columns = [
    defineColumn("title", "Title", 0.5),
    defineColumn("description", "Description", 1),
    {
      field: "fullName",
      headerName: "Author",
      flex: 0.5,
      valueGetter: (value, row) => row.Template.User.fullName,
      renderCell: (params) => (
        <Tooltip title="Click to edit form">
          {params.row.Template.User.fullName}
        </Tooltip>
      ),
    },
  ];
  const StyledGrid = styled("div")(() => ({
    margin: 40,
    marginLeft: 120,
    textAlign: "center",
    textWrap: "nowrap",
  }));
  function gridOverlay() {
    return (
      <StyledGrid>
        <Box>No results found</Box>
      </StyledGrid>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-center m-auto">
        <Box>
          <DataGrid
            rows={forms}
            columns={columns}
            onRowClick={handleClick}
            sx={{
              "& .MuiDataGrid-columnHeaders": {
                fontWeight: "bold",
                fontSize: "1rem",
              },
              "&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell": {
                py: "8px",
              },
              "&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell": {
                py: "15px",
              },
              "&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell": {
                py: "22px",
              },
              "& .MuiDataGrid-row": {
                cursor: "pointer",
              },
            }}
            showToolbar
            slotProps={{
              toolbar: { showQuickFilter: false },
            }}
            slots={{ noRowsOverlay: gridOverlay }}
            getRowHeight={() => "auto"}
          />
        </Box>
      </div>
    </div>
  );
}
