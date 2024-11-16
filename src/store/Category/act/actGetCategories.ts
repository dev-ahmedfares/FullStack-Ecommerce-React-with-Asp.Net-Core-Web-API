import { TCategory } from "@customTypes/index";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosErrorHandler } from "@utils";
import axios from "axios";

type TResponse = TCategory[];

export const actGetGategories = createAsyncThunk(
  "categories/actGetGategories",
  async (_, thunkApi) => {
    const { rejectWithValue,signal } = thunkApi;
    try {
      const response = await axios.get<TResponse>("/Category", {
        signal,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);
