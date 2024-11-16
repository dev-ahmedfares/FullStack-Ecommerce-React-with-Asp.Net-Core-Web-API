import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/store";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import axios from "axios";

const actAddNewCategory = createAsyncThunk("categories/actAddNewCategory",async(data:{categoryName:string,categoryDescription:string},thunkAPI)=>{
    const {rejectWithValue,getState} =thunkAPI
    const {auth} =getState() as RootState
    try {
         await axios.post(`/Category/Add`,data,{
            headers:{
                Authorization:`Bearer ${auth.accessToken}`
            }
        })
        
    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error))
    }
})

export default actAddNewCategory