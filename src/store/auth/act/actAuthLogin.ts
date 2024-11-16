import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import axios from "axios";

type TData = {
  userName: string;
  password: string;
};


const actAuthLogin = createAsyncThunk(
  "auth/actAuthLogin",
  async (data: TData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const response = await axios.post(`/Account/Login`, data, {
        headers: { "Content-Type": "application/json" },
      });
     
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actAuthLogin;
