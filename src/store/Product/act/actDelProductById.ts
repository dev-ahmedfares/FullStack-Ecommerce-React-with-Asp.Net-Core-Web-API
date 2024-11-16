import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/store";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import axios from "axios";

const actDelProductById = createAsyncThunk(
  "products/actDelProductById",
  async (id: number, thunkAPI) => {
    const {rejectWithValue,getState}= thunkAPI
    const {auth}= getState() as RootState
    try {
   await axios.delete(`/Product/${id}`,{
            headers: {
                Authorization: `Bearer ${auth.accessToken}`
              },
         })

         return id
    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error))
    }
  }
);


export default actDelProductById