import { createSlice } from "@reduxjs/toolkit";

const departmentReducer = createSlice({
  name: "departments",
  initialState: {
    department_list: [],
  },
  reducers: {
    setDepartments: (state, action) => {
      state.department_list = action.payload;
    },
    cleanOut: (state, action) => {
      state.department_list = [];

    },
  },
});

export const { setDepartments, cleanOut } = departmentReducer.actions;

export const selectDepartmentList = (state) =>
  state.departments.department_list;

export default departmentReducer.reducer;
