import { TProduct } from "@customTypes/index";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/store";
import {axiosErrorHandler } from "@utils";
import axios from "axios";



const actToggleLike = createAsyncThunk(
  "wishlist/actToggleLike",
  async (productID:number, thunkAPI) => {
    const { rejectWithValue,getState } = thunkAPI;
    const {auth} = getState() as RootState
    
    try {
        const wishlist = await axios.get(
          `/WishList/UserWishList?pageNumber=1&pageSize=999999999`,{
            headers:{
              Authorization:`Bearer ${auth.accessToken}`,
            }
          },
          
        );

        
        const allWishlistProduct = wishlist.data.productsDTOx.filter(Boolean)
        const isLikedBefore =allWishlistProduct.filter((product:TProduct)=> product.productId === productID)

          if(isLikedBefore.length === 0) {

         
            await axios.post(`/WishList/${productID}`,null,{
              headers:{
                Authorization:`Bearer ${auth.accessToken}`,
              }
            })
            return {type:"add",productId:productID}
          } else {
            
               await axios.delete(`/WishList/${productID}`,{
                headers:{
                  Authorization:`Bearer ${auth.accessToken}`,
                }
              })
       
              return {type:"remove",productId:productID}
          }

    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error))
    }
  }
);


export default actToggleLike