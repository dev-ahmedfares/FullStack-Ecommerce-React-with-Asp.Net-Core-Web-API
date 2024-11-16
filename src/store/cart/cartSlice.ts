import { isString, TLoading, TProduct } from "@customTypes/index";
import { createSlice } from "@reduxjs/toolkit";
import actGetCartProductsByItem from "./act/actGetCartProductByItems";

type TInitialState = {
  items: { [key: number]: number };
  productsFullInfo: TProduct[];
  loading: TLoading;
  error: null | string;
};

const initialState: TInitialState = {
  items: {},
  productsFullInfo: [],
  loading: "idle",
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const id = action.payload;

      if (state.items[id]) {
        state.items[id]++;
      } else {
        state.items[id] = 1;
      }
    },
    changeQuantity: (state, action) => {

      state.items[action.payload.id] = action.payload.quantity;
    },
    removeProductFromCart: (state, action) => {
      delete state.items[action.payload];
      state.productsFullInfo = state.productsFullInfo.filter(
        (prod) => prod.productId !== action.payload
      );
    },
    cartCleanUp: (state) => {
      state.productsFullInfo = [];
    },
    clearCartAfterPlaceOrder: (state) => {
      state.items = {};
      state.loading = "idle";
      state.productsFullInfo = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(actGetCartProductsByItem.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actGetCartProductsByItem.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.productsFullInfo = action.payload;
      })
      .addCase(actGetCartProductsByItem.rejected, (state, action) => {
        state.loading = "failed";
        if (isString(action.payload)) state.error = action.payload;
      });
  },
});

export { actGetCartProductsByItem };
export const {
  addToCart,
  changeQuantity,
  removeProductFromCart,
  cartCleanUp,
  clearCartAfterPlaceOrder,
} = cartSlice.actions;
export default cartSlice.reducer;
