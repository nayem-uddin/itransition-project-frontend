import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../assets/API URL";

export const blockUnblockAdmins = createAsyncThunk(
  "manageAccess/updateStatus",
  async (status, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const selectionList = state.adminAccessReducer.selectedAdmins;
      const res = await fetch(`${API_URL}/admins`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ selectionList, status }),
      });
      const data = await res.json();
      if (!res.ok) {
        return rejectWithValue(data.message || "Invalid request");
      }
      return { ...data, status };
    } catch (error) {
      return rejectWithValue(error.message || "Internal server error");
    }
  }
);

export const deleteAdmins = createAsyncThunk(
  "manageAccess/deleteAdmins",
  async (selectionList, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}/admins`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(selectionList),
      });
      const data = await res.json();
      if (!res.ok) {
        return rejectWithValue(data.message ?? "Invalid request");
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message ?? "Internal server error");
    }
  }
);
