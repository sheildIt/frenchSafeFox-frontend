import { createSlice } from "@reduxjs/toolkit";

const companyReducer = createSlice({
  name: "companyView",
  initialState: {
    id: null,
    company_name: null,
  },
  reducers: {
    setCompanyCredentials: (state, action) => {
      const { id, company_name } = action.payload;
      return { ...state, id, company_name };
    },
    logOut: (state, action) => {
      state.id = null;
      state.company_name = null;
    },
  },
});

export const { setCompanyCredentials, logOut } = companyReducer.actions;

export const selectCompany = (state) => state.company.company_name;
export const selectCompanyId = (state) => state.company.id;

export default companyReducer.reducer;
