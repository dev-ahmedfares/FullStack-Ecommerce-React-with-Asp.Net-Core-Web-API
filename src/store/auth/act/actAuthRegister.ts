import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import axios from "axios";

type TData = {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const actAuthRegister = createAsyncThunk(
  "auth/actRegister",
  async (data: TData, thunkAPI) => {
   
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.post(`/Account/register`, data, {
        headers: { "Content-Type": "application/json" },
      });
  
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actAuthRegister;
