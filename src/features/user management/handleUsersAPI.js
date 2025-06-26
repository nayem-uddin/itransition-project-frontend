import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../assets/universals";

export const addToAdmins = createAsyncThunk(
  "userManagement/addToAdmins",
  async (selectedUsers, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}/admins`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(selectedUsers),
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        return rejectWithValue(data.message);
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message ?? "Internal server error");
    }
  }
);

export const getUsers = createAsyncThunk(
  "userManagement/getUsers",
  async () => {
    const res = await fetch(`${API_URL}/users`, { credentials: "include" });
    const data = await res.json();
    return data;
  }
);

export const blockUnblockUsers = createAsyncThunk(
  "userManagement/updateStatus",
  async (status, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const selectionList = state.userManagementReducer.selectedUsers;
      const res = await fetch(`${API_URL}/users`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ selectionList, status }),
        credentials: "include",
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

export const deleteUsers = createAsyncThunk(
  "userManagement/deleteUsers",
  async (selectionList, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}/users`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(selectionList),
        credentials: "include",
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
