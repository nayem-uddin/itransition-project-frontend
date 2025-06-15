import { createSlice } from "@reduxjs/toolkit";
import { blockUnblockAdmins, deleteAdmins } from "./handleAPI";

const manageSlice = createSlice({
  name: "manageAccess",
  initialState: {
    isLoading: false,
    selectedAdmins: [],
    message: "",
  },
  reducers: {
    selectAdmin: (state, action) => {
      state.selectedAdmins.push(action.payload);
    },
    deselectAdmin: (state, action) => {
      const adminIndex = state.selectedAdmins.findIndex(
        (admin) => admin.email === action.payload.email
      );
      state.selectedAdmins.splice(adminIndex, 1);
    },
    selectAll: (state) => {
      state.selectedAdmins = JSON.parse(sessionStorage.getItem("adminsList"));
    },
    deselectAll: (state) => {
      state.selectedAdmins = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(blockUnblockAdmins.pending, (state) => {
      state.isLoading = true;
      state.message = "";
    });
    builder.addCase(blockUnblockAdmins.fulfilled, (state, action) => {
      state.isLoading = false;
      const { message, status } = action.payload;
      const oldAdminsList = [
        ...JSON.parse(sessionStorage.getItem("adminsList")),
      ];
      const selectionListIds = state.selectedAdmins.map((admin) => admin.id);
      sessionStorage.setItem(
        "adminsList",
        JSON.stringify(
          oldAdminsList.map((admin) =>
            selectionListIds.includes(admin.id)
              ? { ...admin, status }
              : { ...admin }
          )
        )
      );
      state.selectedAdmins = [];
      state.message = message;
    });
    builder.addCase(blockUnblockAdmins.rejected, (state, action) => {
      state.isLoading = false;
      state.message = action?.payload?.message ?? action?.error?.message;
    });
    builder.addCase(deleteAdmins.pending, (state) => {
      state.isLoading = true;
      state.message = "";
    });
    builder.addCase(deleteAdmins.fulfilled, (state, action) => {
      state.isLoading = false;
      state.message = action.payload.message;
      const oldAdminsList = JSON.parse(sessionStorage.getItem("adminsList"));
      const selectedIDs = state.selectedAdmins.map((admin) => admin.id);
      const newAdminsList = oldAdminsList.filter(
        (admin) => !selectedIDs.includes(admin.id)
      );
      sessionStorage.setItem("adminsList", JSON.stringify(newAdminsList));
      state.selectedAdmins = [];
    });
    builder.addCase(deleteAdmins.rejected, (state, action) => {
      state.isLoading = false;
      state.message = action?.payload?.message ?? action?.error?.message;
    });
  },
});

export const accessReducer = manageSlice.reducer;
export const { selectAdmin, deselectAdmin, selectAll, deselectAll } =
  manageSlice.actions;
