import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/store";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import axios from "axios";



const actAddProduct = createAsyncThunk(
  "products/actAddProduct",
  async (data:FormData, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const { auth } = getState() as RootState;
    
    try {
       await axios.post(`/Product`, data, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });
    
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actAddProduct;
