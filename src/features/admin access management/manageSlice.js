import { createSlice } from "@reduxjs/toolkit";
import {
  blockUnblockAdmins,
  deleteAdmins,
  getAllAdmins,
} from "./handleAdminsAPI";

const manageSlice = createSlice({
  name: "manageAccess",
  initialState: {
    isLoading: false,
    allAdmins: [],
    selectedAdmins: [],
    message: { text: "", type: null },
  },
  reducers: {
    selectAdmin: (state, action) => {
      state.selectedAdmins.push(action.payload);
    },
    deselectAdmin: (state, action) => {
      const adminIndex = state.selectedAdmins.findIndex(
        (admin) => admin.id === action.payload.id
      );
      state.selectedAdmins.splice(adminIndex, 1);
    },
    selectAll: (state) => {
      state.selectedAdmins = [...state.allAdmins];
    },
    deselectAll: (state) => {
      state.selectedAdmins = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(blockUnblockAdmins.pending, (state) => {
      state.isLoading = true;
      state.message = { text: "", type: null };
    });
    builder.addCase(blockUnblockAdmins.fulfilled, (state, action) => {
      state.isLoading = false;
      const { message, status } = action.payload;
      const selectedIds = state.selectedAdmins.map((admin) => admin.id);
      state.allAdmins = state.allAdmins.map((admin) =>
        selectedIds.includes(admin.id) ? { ...admin, status } : { ...admin }
      );
      state.selectedAdmins = [];
      state.message = { text: message, type: "confirmation" };
    });
    builder.addCase(blockUnblockAdmins.rejected, (state, action) => {
      state.isLoading = false;
      state.message = {
        text: action.payload ?? action?.error?.message,
        type: "error",
      };
    });
    builder.addCase(deleteAdmins.pending, (state) => {
      state.isLoading = true;
      state.message = { text: "", type: null };
    });
    builder.addCase(deleteAdmins.fulfilled, (state, action) => {
      state.isLoading = false;
      state.message = { text: action.payload.message, type: "confirmation" };
      const selectedIds = state.selectedAdmins.map((admin) => admin.id);
      state.allAdmins = state.allAdmins.filter(
        (admin) => !selectedIds.includes(admin.id)
      );
      state.selectedAdmins = [];
    });
    builder.addCase(deleteAdmins.rejected, (state, action) => {
      state.isLoading = false;
      state.message = {
        text: action.payload ?? action?.error?.message,
        type: "error",
      };
    });
    builder.addCase(getAllAdmins.pending, (state) => {
      state.isLoading = true;
      state.message = { text: "", type: null };
    });
    builder.addCase(getAllAdmins.fulfilled, (state, action) => {
      state.isLoading = false;
      state.allAdmins = action.payload;
    });
    builder.addCase(getAllAdmins.rejected, (state, action) => {
      state.isLoading = false;
      state.message = {
        text:
          action?.payload?.message ??
          action?.error?.message ??
          "Error fetching data",
      };
    });
  },
});

export const accessReducer = manageSlice.reducer;
export const { selectAdmin, deselectAdmin, selectAll, deselectAll } =
  manageSlice.actions;
