import { DataGrid } from "@mui/x-data-grid";
import { Box, styled, Toolbar, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Markdown from "react-markdown";
import { useState } from "react";
import { GridToolbar } from "@mui/x-data-grid/internals";
import DeleteTemplates from "../../components/topbars/showcase top bar/DeleteTemplates";
import PopupMessage from "../../components/template showcase/PopupMessage";
import { waitRequest } from "../../assets/universals";

export default function Showcase({ templates }) {
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const [selectedIds, setSelectedIds] = useState([]);
  const [message, setMessage] = useState(waitRequest);
  const [open, setOpen] = useState(true);
  function handleClick(params, event, details) {
    const idx = templates.findIndex((template) => template.id === params.id);
    navigate("/edit-template", {
      state: templates[idx],
    });
  }
  function getSelectedRowIds(selectedRows) {
    setSelectedIds(Array.from(selectedRows.ids));
  }
  function CustomToolbar() {
    return (
      <Toolbar>
        <GridToolbar />
        <Tooltip>
          <DeleteTemplates
            templateIds={selectedIds}
            setMessage={setMessage}
            setOpen={setOpen}
          />
        </Tooltip>
      </Toolbar>
    );
  }
  function defineColumn(field, headerName, flex) {
    return {
      field,
      headerName,
      flex,
      renderCell: (params) => (
        <Tooltip title="Click to view and edit full template">
          <Box>
            <Markdown>{params.row[field]}</Markdown>
          </Box>
        </Tooltip>
      ),
    };
  }
  const authorColumn = {
    field: "fullName",
    headerName: "Author",
    flex: 0.5,
    valueGetter: (value, row) => row.User.fullName,
    renderCell: (params) => (
      <Tooltip title="Click to view full template">
        {params.row?.User?.fullName}
      </Tooltip>
    ),
  };
  const commonColumns = [
    defineColumn("title", "Title", 0.5),
    defineColumn("description", "Description", 1),
  ];
  const columns =
    currentPath === "/admin-dashboard"
      ? [...commonColumns, authorColumn]
      : commonColumns;
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
        <Box sx={{ minWidth: "300px" }}>
          <DataGrid
            onRowSelectionModelChange={getSelectedRowIds}
            checkboxSelection
            rows={templates}
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
            slots={{ noRowsOverlay: gridOverlay, toolbar: CustomToolbar }}
            getRowHeight={() => "auto"}
          />
        </Box>
      </div>
      <PopupMessage message={message} isOpen={open} setOpen={setOpen} />
    </div>
  );
}
