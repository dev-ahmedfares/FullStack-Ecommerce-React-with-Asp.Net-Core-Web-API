import { TOrderList } from "./../../types/index";
import { isString, TLoading } from "@customTypes/index";
import { createSlice } from "@reduxjs/toolkit";
import actConfirmOrder from "./act/actConfirmOrder";
import actGetOrders from "./act/actGetOrders";

type TOrderState = {
  loading: TLoading;
  error: null | string;
  ordersList: TOrderList[];
};

const initialState: TOrderState = {
  loading: "idle",
  error: null,
  ordersList: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetOrderStatus: (state) => {
      state.loading = "idle";
      state.error = null;
      state.ordersList=[]
    },
  },
  extraReducers: (builder) => {
    // Confirm Orders
    builder
      .addCase(actConfirmOrder.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actConfirmOrder.fulfilled, (state) => {
        state.loading = "succeeded";
      })
      .addCase(actConfirmOrder.rejected, (state, action) => {
        state.loading = "failed";
        if (isString(action.payload)) {
          state.error = action.payload;
        }
      });

    // Get Orders
    builder
      .addCase(actGetOrders.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actGetOrders.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.ordersList = action.payload;
      })
      .addCase(actGetOrders.rejected, (state, action) => {
        state.loading = "failed";
        if (isString(action.payload)) {
          state.error = action.payload;
        }
      });
  },
});

export const { resetOrderStatus } = orderSlice.actions;
export { actConfirmOrder, actGetOrders };
export default orderSlice.reducer;
