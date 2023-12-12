import { createSlice } from "@reduxjs/toolkit";

const templateReducer = createSlice({
  name: "templates",
  initialState: {
    template_list: [],
  },
  reducers: {
    setDepartments: (state, action) => {
      state.template_list = action.payload;
    },
    cleanOut: (state, action) => {
      state.template_list = [];

    },
  },
});

export const { setTemplates, cleanOut } = templateReducer.actions;

export const selectTemplate = (state) =>
  state.templates.template_list;

export default templateReducer.reducer;
