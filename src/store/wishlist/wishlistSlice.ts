import { isString, TLoading, TProduct } from "@customTypes/index";
import { createSlice } from "@reduxjs/toolkit";
import actToggleLike from "./act/actToggleLike";
import actGetWishlist from "./act/actGetWishlist";
import { authLogout } from "@store/auth/authSlice";

type TWishlistState = {
  productsId: number[];
  productsFullInfo: TProduct[];
  isTheLastPage:boolean;
  error: null | string;
  loading: TLoading;
  loadingWishlistCount: TLoading
};

const initialState: TWishlistState = {
  productsId: [],
  isTheLastPage:false,
  productsFullInfo: [],
  error: null,
  loading: "idle",
  loadingWishlistCount: "idle",
};
const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    wishlistCleanUp: (state) => {
      state.productsFullInfo = [];
      state.error = null;
      state.isTheLastPage = false
      state.loading = 'idle'
      state.loadingWishlistCount = "idle"
    },
  },
  extraReducers: (builder) => {

    // Add Product to wishlist
    builder
      .addCase(actToggleLike.pending, (state) => {
        state.loadingWishlistCount= "pending"
        state.error = null;
      })
      .addCase(actToggleLike.fulfilled, (state, action) => {
        state.loadingWishlistCount= "succeeded"
        if (action.payload.type === "add") {
          state.productsId.push(action.payload.productId);
        } else if (action.payload.type === "remove") {
          
          state.productsId = state.productsId.filter(
            (el) => el !== action.payload.productId
          );

          const allAddedWishlistProduct =state.productsFullInfo.filter(Boolean)
          state.productsFullInfo =allAddedWishlistProduct.filter(
            (prod) =>  prod.productId !== action.payload.productId
          );
         
        }
      })
      .addCase(actToggleLike.rejected, (state, action) => {
        state.loadingWishlistCount= "failed"
        if (isString(action.payload)) state.error = action.payload;
      });

      // Get Product That added to wishlist
    builder
      .addCase(actGetWishlist.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actGetWishlist.fulfilled, (state, action) => {
        state.loading = "succeeded";

        if (action.payload.dataType === "productIds") {
          state.productsId = action.payload.data as number[];
        } else if (action.payload.dataType === "productsFullInfo") {
          state.productsFullInfo = action.payload.data as TProduct[];
        }
        state.isTheLastPage = action.payload.isTheLastPage
      })
      .addCase(actGetWishlist.rejected, (state, action) => {
        state.loading = "failed";
        if (isString(action.payload)) state.error = action.payload;
      });

      // Reset Quantity when logout
      builder.addCase(authLogout,(state)=>{
        state.productsId=[]
      })
  },
});

export const { wishlistCleanUp } = wishlistSlice.actions;
export { actToggleLike, actGetWishlist };
export default wishlistSlice.reducer;
