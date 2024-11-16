import { isString, TLoading, TProduct } from "@customTypes/index";
import { createSlice } from "@reduxjs/toolkit";
import actGetProductByPrefix from "./act/actGetProductsByPrefix";
import actGetSingleProduct from "./act/actGetSingleProduct";
import actAddProduct from "./act/actAddProduct";
import actDelProductById from "./act/actDelProductById";
import actUpdateProductById from "./act/actUpdateProductById";

type TInitialState = {
  records: TProduct[];
  isTheLastPage: boolean;
  loading: TLoading;
  error: string | null;
  singleProduct: TProduct | null;
};

const initialState: TInitialState = {
  records: [],
  singleProduct: null,
  loading: "idle",
  error: null,
  isTheLastPage: false,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    productsCleanUp: (state) => {
      state.records = [];
      state.loading = "idle";
      state.isTheLastPage = false;
    },
    singleProductCleanUp: (state) => {
      state.singleProduct = null;
      state.records = [];
      state.loading = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(actGetProductByPrefix.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actGetProductByPrefix.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.records = action.payload.listx;
        state.isTheLastPage = action.payload.isTheLastPage;
      })
      .addCase(actGetProductByPrefix.rejected, (state, action) => {
        state.loading = "failed";
        if (isString(action.payload)) {
          state.error = action.payload;
        }
      });

    // Get Single Product By Id
    builder
      .addCase(actGetSingleProduct.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actGetSingleProduct.fulfilled, (state, action) => {
        state.loading = "succeeded";

        state.singleProduct = action.payload.singleProduct;

        state.records = action.payload?.relatedProducts.productsDTOx;
        state.isTheLastPage = action.payload?.relatedProducts.isTheLastPage;
      })
      .addCase(actGetSingleProduct.rejected, (state, action) => {
        state.loading = "failed";

        if (isString(action.payload)) {
          state.error = action.payload;
        }
      });

    // Add New Product
    builder
      .addCase(actAddProduct.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actAddProduct.fulfilled, (state) => {
        state.loading = "succeeded";
      })
      .addCase(actAddProduct.rejected, (state, action) => {
        state.loading = "failed";
        if (isString(action.payload)) {
          state.error = action.payload;
        }
      });

    // Delete Product
    builder
      .addCase(actDelProductById.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actDelProductById.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.records = state.records.filter(
          (product) => product.productId !== action.payload
        );
      })
      .addCase(actDelProductById.rejected, (state, action) => {
        state.loading = "failed";
        if (isString(action.payload)) {
          state.error = action.payload;
        }
      });

    // Update Product
    builder
      .addCase(actUpdateProductById.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actUpdateProductById.fulfilled, (state) => {
        state.loading = "succeeded";
      })
      .addCase(actUpdateProductById.rejected, (state, action) => {
        state.loading = "failed";
        if (isString(action.payload)) {
          state.error = action.payload;
        }
      });
  },
});
export const { productsCleanUp, singleProductCleanUp } = productSlice.actions;
export {
  actGetProductByPrefix,
  actDelProductById,
  actGetSingleProduct,
  actAddProduct,
  actUpdateProductById,
};
export default productSlice.reducer;
