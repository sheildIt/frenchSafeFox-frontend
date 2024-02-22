import { createSlice } from "@reduxjs/toolkit";

const departmentReducer = createSlice({
  name: "departments",
  initialState: [],
  reducers: {
    setDepartments: (state, action) => {
      const { department_progress } = action.payload;
      return {
        ...state,
        department_progress,
      };
    },
    cleanOut: (state, action) => {
      state.department_progress = [];
    },
  },
});

export const { setDepartments, cleanOut } = departmentReducer.actions;

export const selectDepartmentList = (state) =>
  state.departments.department_progress;

export default departmentReducer.reducer;
