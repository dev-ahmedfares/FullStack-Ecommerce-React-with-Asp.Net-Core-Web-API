import { isString, TLoading } from "@customTypes/index";
import { createSlice } from "@reduxjs/toolkit";
import actAuthRegister from "@store/auth/act/actAuthRegister";
import actAuthLogin from "./act/actAuthLogin";
import actChangePassword from "./act/actChangePassword";
import actGiveUserRole from "./act/actGiveUserRole";
type TAuthState = {
  loading: TLoading;
  error: null | string;
  errorRole:null | string;
  loadingRole:TLoading;
  accessToken: string | null;
  roles:string[]
  user: {
    userName: string;
    email: string;
    userId: number;
  } | null;
};

const initialState: TAuthState = {
  loading: "idle",
  error: null,
  errorRole:null,
  loadingRole:"idle",
  accessToken: null,
  user: null,
  roles:[]
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetUI: (state) => {
      state.error = null;
      state.loading = "idle";
      state.errorRole = null;
      state.loadingRole = "idle";
      
    },
    authLogout: (state) => {
      state.accessToken = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    // Register
    builder
      .addCase(actAuthRegister.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actAuthRegister.fulfilled, (state) => {
        state.loading = "succeeded";
      })
      .addCase(actAuthRegister.rejected, (state, action) => {
        state.loading = "failed";
        if (isString(action.payload)) state.error = action.payload;
      });

    // Login
    builder
      .addCase(actAuthLogin.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actAuthLogin.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.accessToken = action.payload.token;
        state.user = action.payload.user;
        state.roles = action.payload.roles;
      })
      .addCase(actAuthLogin.rejected, (state, action) => {
        state.loading = "failed";
        if (isString(action.payload)) state.error = action.payload;
      });

      // Change Password
      builder
      .addCase(actChangePassword.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actChangePassword.fulfilled, (state) => {
        state.loading = "succeeded";
      })
      .addCase(actChangePassword.rejected, (state, action) => {
        state.loading = "failed";
        if (isString(action.payload)) state.error = action.payload;
      });

      // Give User Role
      builder
      .addCase(actGiveUserRole.pending, (state) => {
        state.loadingRole = "pending";
        state.errorRole = null;
      })
      .addCase(actGiveUserRole.fulfilled, (state) => {
        state.loadingRole = "succeeded";
      })
      .addCase(actGiveUserRole.rejected, (state, action) => {
        state.loadingRole = "failed";
        if (isString(action.payload)) state.errorRole = action.payload;
      });
  },
});

export { actAuthRegister, actAuthLogin,actChangePassword ,actGiveUserRole};
export default authSlice.reducer;
export const { resetUI,authLogout } = authSlice.actions;
