import { TProduct } from "@customTypes/index";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosErrorHandler } from "@utils";
import axios from "axios";

type TResponse = {
  isTheLastPage:boolean,
  listx:TProduct[]
};

type TPrefix ={
  pageNumber:number,
  pageSize:number,
  filterQuery?:string
}

const actGetProductByPrefix = createAsyncThunk(
  "products/actGetProductByPrefix",
  async (prefix: TPrefix, thunkAPi) => {
    const { rejectWithValue, signal } = thunkAPi;

    try {
      const {pageNumber,pageSize,filterQuery} = prefix
      
      
      let response;
      if (filterQuery) {
         response = await axios.get<TResponse>(`/Product/Filtering?${filterQuery}&pageNumber=${pageNumber}&pageSize=${pageSize}`, { signal });
      } else {
         response = await axios.get<TResponse>(`/Product?pageNumber=${pageNumber}&pageSize=${pageSize}`, { signal });
      }

      
      return response.data;
      
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetProductByPrefix;
