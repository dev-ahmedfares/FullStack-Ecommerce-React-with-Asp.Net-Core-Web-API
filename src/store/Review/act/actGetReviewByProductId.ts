import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import axios from "axios";

const actGetReviewByProductId = createAsyncThunk("reviews/actGetReviewByProductId",async(productId:number,thunkAPI)=>{
    const {rejectWithValue,signal}= thunkAPI

    try {
        const response = await axios.get(`/Review/${productId}`,{signal})
        
        return response.data
    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error))
    }
})

export default actGetReviewByProductId