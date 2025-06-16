import { configureStore } from "@reduxjs/toolkit";
import { accessReducer } from "../features/admin access management/manageSlice";
import { controlReducer } from "../features/user management/controlSlice";

export const store = configureStore({
  reducer: {
    adminAccessReducer: accessReducer,
    userManagementReducer: controlReducer,
  },
});
