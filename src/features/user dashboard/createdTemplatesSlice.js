import { createSlice } from "@reduxjs/toolkit";
import Fuse from "fuse.js";

const createdTemplatesSlice = createSlice({
  name: "templates",
  initialState: {
    allTemplates: [],
    filteredTemplates: [],
  },
  reducers: {
    updateCreatedTemplates: (state, action) => {
      state.allTemplates = action.payload;
      state.filteredTemplates = state.allTemplates;
    },
    filterTemplatesBySearch: (state, action) => {
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
        ],
        threshold: 0,
      });
      const keyword = action.payload;
      state.filteredTemplates = keyword
        ? fuse.search(keyword).map((result) => result.item)
        : state.allTemplates;
    },
  },
});

export const createdTemplatesReducer = createdTemplatesSlice.reducer;
export const { updateCreatedTemplates, filterTemplatesBySearch } =
  createdTemplatesSlice.actions;
