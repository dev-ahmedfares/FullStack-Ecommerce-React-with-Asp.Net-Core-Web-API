
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import axios from "axios";


const actGetSingleProduct = createAsyncThunk(
  "products/actGetSingleProduct",
  async (
    { productId, withRelated }: { productId: number; withRelated?: boolean },
    thunkAPI
  ) => {
    const { rejectWithValue, signal } = thunkAPI;

    try {
      const productRequest =  axios.get(`/Product/${productId}`, {
        signal,
      });
      
      // if (withRelated && singleProduct.data.productImages.length > 0) {
      //   const relatedProducts = await axios.get(
      //     `/Product/categoryproduct/${singleProduct.data.categoryId}?pageNumber=1&pageSize=10`
      //   );
      //   return { 
      //     singleProduct: singleProduct.data,
      //     relatedProducts: relatedProducts.data,
      //   };
      // }
      
      let relatedProductsRequest = null;
      if (withRelated) {
         relatedProductsRequest = productRequest.then((response)=>{
          const singleProduct = response.data;
          return axios.get(
            `/Product/categoryproduct/${singleProduct.categoryId}?pageNumber=1&pageSize=10`
          );
        })
      }
      const [singleProductResponse, relatedProductsResponse] = await Promise.all([
        productRequest,
        relatedProductsRequest,
      ]);

      return { 
        singleProduct: singleProductResponse.data,
        relatedProducts: relatedProductsResponse?.data || { isTheLastPage: false, records: [] },
      };

  
    } catch (error) {
      
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetSingleProduct;
