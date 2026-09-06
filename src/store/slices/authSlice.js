import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  session: null,
  isAuthenticated: false,
  loading: true,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthSession: (state, action) => {
      state.user = action.payload?.user || null;
      state.session = action.payload?.session || null;
      state.isAuthenticated = !!action.payload?.user;
      state.loading = false;
      state.error = null;
    },
    setAuthLoading: (state, action) => {
      state.loading = action.payload;
    },
    setAuthError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearAuthSession: (state) => {
      state.user = null;
      state.session = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setAuthSession, setAuthLoading, setAuthError, clearAuthSession } =
  authSlice.actions;

export default authSlice.reducer;