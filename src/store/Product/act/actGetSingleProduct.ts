import { TProduct } from "@customTypes/index";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import axios from "axios";

type TResponse = {
  isTheLastPage: boolean;
  productsDTOx: TProduct[];
};

const actGetSingleProduct = createAsyncThunk(
  "products/actGetSingleProduct",
  async (
    { productId, withRelated }: { productId: number; withRelated?: boolean },
    thunkAPI
  ) => {
    const { rejectWithValue, signal } = thunkAPI;

    try {
      const singleProduct = await axios.get(`/Product/${productId}`, {
        signal,
      });
      
      if (withRelated && singleProduct.data.productImages.length > 0) {
        const relatedProducts = await axios.get(
          `/Product/categoryproduct/${singleProduct.data.categoryId}?pageNumber=1&pageSize=10`
        );
        return {
          singleProduct: singleProduct.data,
          relatedProducts: relatedProducts.data,
        };
      }
      return {
        singleProduct: singleProduct.data,
        relatedProducts: { isTheLastPage: false, records: [] },
      };
    } catch (error) {
      
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetSingleProduct;
