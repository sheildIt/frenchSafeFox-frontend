import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "access",
  initialState: { user: null, token: null },
  reducers: {
    setCredentials: (state, action) => {
      console.log(
        "setCredentials action dispatched with payload:",
        action.payload
      );
      const { user, access } = action.payload;
      return { ...state, user, token: access };
    },
    logOut: (state, action) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
export const logUserOut = (initialState) => initialState;
