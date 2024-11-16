import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import axios from "axios";
type TData = {
  userName: string;
  password: string;
  newPassword: string;
};
const actChangePassword = createAsyncThunk(
  "auth/actChangePassword",
  async (newPassword: TData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.post(
        "/Account/ChangePassword",
        newPassword,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actChangePassword;
