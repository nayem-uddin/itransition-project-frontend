import { createSlice } from "@reduxjs/toolkit";

const defaultHeading = "click to edit";
const defaultQuestionTitle = "click to edit title";
const defaultText = "click to edit";
const question = {
  title: defaultQuestionTitle,
  description: "click to edit description",
  type: "string",
  showOnPreview: false,
};

const templateSlice = createSlice({
  name: "template",
  initialState: {
    title: defaultHeading,
    description: defaultText,
    accessibility: "public",
    topic: "survey",
    Questions: [question],
    tags: [],
  },
  reducers: {
    updateWholeTemplate: (state, action) => {
      Object.assign(state, action.payload);
    },
    addNewQuestion: (state) => {
      state.Questions.push(question);
    },
    setAnyQuestionProp: (state, action) => {
      const { index, field, value } = action.payload;
      const oldQuestion = state.Questions[index];
      state.Questions.splice(index, 1, { ...oldQuestion, [field]: value });
    },
    modifyOptions: (state, action) => {
      const { index, options } = action.payload;
      const oldQuestion = state.Questions[index];
      state.Questions.splice(index, 1, { ...oldQuestion, options });
    },
    deleteQuestionProperties: (state, action) => {
      const { properties, index } = action.payload;
      const oldQuestion = { ...state.Questions[index] };
      properties.map((prop) => delete oldQuestion[prop]);
      state.Questions.splice(index, 1, oldQuestion);
    },
    setInputMinMax: (state, action) => {
      const { index, range } = action.payload;
      const oldQuestion = state.Questions[index];
      state.Questions.splice(index, 1, { ...oldQuestion, ...range });
    },
    reorderQuestions: (state, action) => {
      const { oldPosition, newPosition } = action.payload;
      const draggedQuestion = state.Questions[oldPosition];
      state.Questions.splice(oldPosition, 1);
      state.Questions.splice(newPosition, 0, draggedQuestion);
    },
    setTemplateProp: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
      if (state.accessibility === "public") {
        delete state["usersWithAccess"];
      }
    },
    giveAccess: (state, action) => {
      Object.assign(state, { usersWithAccess: action.payload });
    },
    setTags: (state, action) => {
      state.tags = action.payload;
    },
  },
});

export const templateReducer = templateSlice.reducer;
export const {
  updateWholeTemplate,
  setTags,
  addNewQuestion,
  setAnyQuestionProp,
  modifyOptions,
  deleteQuestionProperties,
  setInputMinMax,
  reorderQuestions,
  setTemplateProp,
  giveAccess,
} = templateSlice.actions;
