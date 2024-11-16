
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/store";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import axios from "axios";

const actUpdateProductById = createAsyncThunk(
  "products/actUpdateProductById",
  async ( product : FormData ,thunkAPI) => {
    const {rejectWithValue,getState} = thunkAPI
    const {auth} = getState() as RootState
    
    try {
        
         await axios.put(`/Product`,product,{
            headers: {
                
                Authorization: `Bearer ${auth.accessToken}`
              },
         })
        
    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error))
    }
}
);


export default actUpdateProductById