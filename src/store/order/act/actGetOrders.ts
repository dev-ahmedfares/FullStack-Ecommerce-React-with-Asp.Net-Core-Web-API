import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/store";
import axiosErrorHandler from "@utils/axiosErrorHandler";




const actGetOrders = createAsyncThunk(
  "order/actGetOrders",
  async (_, thunkAPI) => {
    const API_URL = import.meta.env.VITE_FETCH_URL
    const {rejectWithValue,getState,signal}= thunkAPI
const {auth} = getState()  as RootState  
    try {
        const response = await fetch(`${API_URL}/order?userId=${auth.user?.userId}`,{signal});

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json()
        
        return data
    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error))
    }
  }
);


export default actGetOrders