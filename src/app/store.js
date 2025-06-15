import { configureStore } from "@reduxjs/toolkit";
import { accessReducer } from "../features/admin access management/manageSlice";

export const store = configureStore({
  reducer: {
    adminAccessReducer: accessReducer,
  },
});
