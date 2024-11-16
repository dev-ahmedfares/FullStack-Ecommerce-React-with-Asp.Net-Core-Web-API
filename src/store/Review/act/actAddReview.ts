import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/store";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import axios from "axios";
type TReview = {
    productId: number,
    rating: number,
    comment:string,
}
const actAddReview = createAsyncThunk("reviews/actAddReview",async(review:TReview,thunkAPI)=>{
    const {rejectWithValue,getState} = thunkAPI
    const { auth} = getState() as RootState
    try {
        const response = await axios.post(`/Review/AddReview`,review,{
            headers:{
                Authorization:`Bearer ${auth.accessToken}`
            }
        })
        if (response.data === "Review made before") {
            await axios.put(`/Review/UpdateReview`,review,{
                headers:{
                    Authorization:`Bearer ${auth.accessToken}`
                }
            })
        }
        
        
    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error))
    }
})

export default actAddReview