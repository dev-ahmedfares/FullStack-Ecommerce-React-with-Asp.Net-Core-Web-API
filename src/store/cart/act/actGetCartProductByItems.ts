import { RootState } from "./../../store";

import { TProduct } from "@customTypes/index";
import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { axiosErrorHandler } from "@utils";



const actGetCartProductsByItem = createAsyncThunk(
  "cart/actGetCartProductByItems",
  async (_, thunkAPI) => {
    const { rejectWithValue, getState, fulfillWithValue,signal } = thunkAPI;
    const { cart } = getState() as RootState;

    if (!Object.keys(cart.items).length) return fulfillWithValue([]);
    
    const products = Object.keys(cart.items)
    
    try {
      const response = await axios.get(`/Product?pageNumber=1&pageSize=999999`,{signal});
      
      const cartProducts = response.data.listx.filter((product:TProduct)=> products.includes(String(product.productId)))
        
      return cartProducts;
    } catch (error) {
     return rejectWithValue(axiosErrorHandler(error))
    }
  }
);

export default actGetCartProductsByItem;
