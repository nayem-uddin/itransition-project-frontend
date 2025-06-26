import { createSlice } from "@reduxjs/toolkit";
import Fuse from "fuse.js";

const gallerySlice = createSlice({
  name: "gallery",
  initialState: {
    allTemplates: [],
    filteredTemplates: [],
  },
  reducers: {
    filterBySearch: (state, action) => {
      const fuse = new Fuse(state.allTemplates, {
        keys: [
          "title",
          "description",
          "accessibility",
          "topic",
          "Questions.title",
          "Questions.type",
          "Questions.description",
          "tags.tagname",
          "User.fullName",
        ],
        threshold: 0,
      });

      const keyword = action.payload;
      state.filteredTemplates = keyword
        ? fuse.search(keyword).map((result) => result.item)
        : state.allTemplates;
    },
    updateTemplatesList: (state, action) => {
      const templates = action.payload;
      state.allTemplates = sessionStorage.getItem("isAdmin")
        ? templates
        : templates.filter(
            (template) =>
              template.accessibility === "public" ||
              (sessionStorage.getItem("id") &&
                (template.UserId == sessionStorage.getItem("id") ||
                  template.usersWithAccess.includes(
                    Number(sessionStorage.getItem("id"))
                  )))
          );
      state.filteredTemplates = state.allTemplates;
    },
  },
});

export const galleryReducer = gallerySlice.reducer;
export const { filterBySearch, updateTemplatesList } = gallerySlice.actions;
