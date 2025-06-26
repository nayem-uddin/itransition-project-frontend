import { configureStore } from "@reduxjs/toolkit";
import { accessReducer } from "../features/admin access management/manageSlice";
import { controlReducer } from "../features/user management/controlSlice";
import { templateReducer } from "../features/template creation/templateSlice";
import { galleryReducer } from "../features/filter templates/gallerySlice";
import { createdTemplatesReducer } from "../features/user dashboard/createdTemplatesSlice";

export const store = configureStore({
  reducer: {
    adminAccessReducer: accessReducer,
    userManagementReducer: controlReducer,
    templateReducer,
    galleryReducer,
    createdTemplatesReducer,
  },
});
