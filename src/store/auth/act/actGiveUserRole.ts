import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/store";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import axios from "axios";

const actGiveUserRole = createAsyncThunk(
  "auth/actGiveUserRole",
  async (email: string, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const { auth } = getState() as RootState;
 

    try {
      const response = await axios.post(`/Account/${email}`, null, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGiveUserRole;
