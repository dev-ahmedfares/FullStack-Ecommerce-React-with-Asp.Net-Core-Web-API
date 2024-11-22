import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/store";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import axios from "axios";

const actDelReview = createAsyncThunk("reviews/actDelReview",async(productId:number,thunkAPI)=>{
    const {rejectWithValue,getState}= thunkAPI
    const {auth}= getState() as RootState
    try {
        await axios.delete(`/Review/${productId}`,{
            headers:{
                Authorization:`Bearer ${auth.accessToken}`
            }
        })

        return auth.user?.userName
    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error))
    }
})

export default actDelReview