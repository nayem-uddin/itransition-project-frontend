import { createSlice } from "@reduxjs/toolkit";
import {
  addToAdmins,
  blockUnblockUsers,
  deleteUsers,
  getUsers,
} from "./handleUsersAPI";

const userManagementSlice = createSlice({
  name: "userManagement",
  initialState: {
    isLoading: false,
    selectedUsers: [],
    allUsers: [],
    message: { text: "", type: null },
    isAdminsListUpdated: false,
  },
  reducers: {
    selectUser: (state, action) => {
      state.selectedUsers.push(action.payload);
    },
    deselectuser: (state, action) => {
      const userIndex = state.selectedUsers.findIndex(
        (user) => user.id === action.payload.id
      );
      state.selectedUsers.splice(userIndex, 1);
    },
    selectAllUsers: (state) => {
      state.selectedUsers = [...state.allUsers];
    },
    deselectAllUsers: (state) => {
      state.selectedUsers = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addToAdmins.pending, (state) => {
      state.isLoading = true;
      state.message = "";
      state.isAdminsListUpdated = false;
    });
    builder.addCase(addToAdmins.fulfilled, (state, action) => {
      state.isLoading = false;
      const { message } = action.payload;
      state.selectedUsers = [];
      state.message = {
        text: message ?? "Added to admins' list",
        type: "confirmation",
      };
      state.isAdminsListUpdated = true;
    });
    builder.addCase(addToAdmins.rejected, (state, action) => {
      state.isLoading = false;
      state.message = {
        text: action?.payload ?? "Request failed",
        type: "error",
      };
      state.isAdminsListUpdated = false;
    });
    builder.addCase(getUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.allUsers = action.payload.usersList;
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.message = { text: action?.error?.message ?? "Fetching failed" };
    });
    builder.addCase(blockUnblockUsers.pending, (state) => {
      state.isLoading = true;
      state.message = { text: "", type: null };
    });
    builder.addCase(blockUnblockUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      const { message, status } = action.payload;
      const selectedIds = state.selectedUsers.map((user) => user.id);
      state.allUsers = state.allUsers.map((user) =>
        selectedIds.includes(user.id) ? { ...user, status } : { ...user }
      );
      state.selectedUsers = [];
      state.message = { text: message, type: "confirmation" };
    });
    builder.addCase(blockUnblockUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.message = {
        text: action.payload ?? action?.error?.message,
        type: "error",
      };
    });
    builder.addCase(deleteUsers.pending, (state) => {
      state.isLoading = true;
      state.message = { text: "", type: null };
    });
    builder.addCase(deleteUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      const selectedIds = state.selectedUsers.map((user) => user.id);
      state.allUsers = state.allUsers.filter(
        (user) => !selectedIds.includes(user.id)
      );
      state.selectedUsers = [];
      state.message = { text: action.payload.message, type: "confirmation" };
    });
    builder.addCase(deleteUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.message = {
        text: action.payload ?? action?.error?.message,
        type: "error",
      };
    });
  },
});

export const controlReducer = userManagementSlice.reducer;
export const { selectAllUsers, selectUser, deselectAllUsers, deselectuser } =
  userManagementSlice.actions;
