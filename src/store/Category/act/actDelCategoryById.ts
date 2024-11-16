import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/store";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import axios from "axios";

const actDelCategoryById = createAsyncThunk("categories/actDelCategoryById",async (id:number,thunkAPI) => {
    const {rejectWithValue,getState} =thunkAPI
    const {auth} = getState() as RootState
    try {
        const response = await axios.delete(`/Category/${id}`,{
            headers: {
                Authorization: `Bearer ${auth.accessToken}`
              },
         })
       
    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error))
    }
    
})

export default actDelCategoryById