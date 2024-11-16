import { TProduct } from "@customTypes/index";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/store";
import { axiosErrorHandler } from "@utils";
import axios from "axios";

type TDataType = "productsFullInfo" | "productIds";

const actGetWishlist = createAsyncThunk(
  "wishlist/actGetWishlist",
  async ({data,currentPage=1,pageSize=99999999}:{data: TDataType,currentPage?: number,pageSize?: number}, thunkAPI) => {
    const { rejectWithValue, signal, getState } = thunkAPI;
    const { auth } = getState() as RootState;
    try {
      const userWishlist = await axios.get(
        `/WishList/UserWishList?pageNumber=${currentPage}&pageSize=${pageSize}`,{
          signal,
          headers:{
            Authorization:`Bearer ${auth.accessToken}`,
          }
        },
        
      );

      if ( userWishlist.data.productsDTOx.length === 0  ) {
       
        return { dataType: "empty", data:[],isTheLastPage:false };
      }
      
      if (data === "productIds") {
        
        const concatenatedProductsId = userWishlist.data.productsDTOx.filter(Boolean).map(
          (product:TProduct) => product.productId
        );

        return { dataType: "productIds", data: concatenatedProductsId,isTheLastPage:false };

      } else {
        
        return { dataType: "productsFullInfo", data: userWishlist.data.productsDTOx,isTheLastPage: userWishlist.data.isTheLastPage };
      }
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetWishlist;
