import { createSlice } from "@reduxjs/toolkit";

const analyticsReducer = createSlice({
  name: "analytics",
  initialState: {
    total_email_sents: null,
    total_reported_email: null,
    total_employees: null,
    stored: false,
  },
  reducers: {
    setAnalyticsData: (state, action) => {
      const {
        total_email_sents,
        total_reported_email,
        total_employees,
        stored,
      } = action.payload;
      return {
        ...state,
        total_email_sents,
        total_reported_email,
        total_employees,
        stored,
      };
    },
    clearAnalytics: (state) => {
      state.total_email_sents = null;
      state.total_reported_email = null;
      state.total_employees = null;
      state.stored = false;
    },
  },
});

export const { setAnalyticsData, clearAnalytics } = analyticsReducer.actions;

export const selectAnalytics = (state) => state.analytics;

export default analyticsReducer.reducer;
