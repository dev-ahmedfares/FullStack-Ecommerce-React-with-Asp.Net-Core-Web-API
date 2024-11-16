import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import axios from "axios";

const actGetProductsByCategoryId = createAsyncThunk(
  "products/actGetProductsByCategoryId",
  async (categoryId: number, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const products = await axios.get(
        `/Product/categoryproduct/${categoryId}?pageNumber=1&pageSize=10`
      );
      
      return products.data
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetProductsByCategoryId;