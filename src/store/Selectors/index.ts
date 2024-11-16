import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

// To check if parameter change or not if change will call function else will return same value and selector not caused any render
export const handleTotalQuantity = createSelector(
  (state: RootState) => state.cart.items,
  (items) => {
    const totalQuantity = Object.values(items).reduce(
      (acc, currEl) => acc + currEl,
      0
    );

    return totalQuantity;
  }
);
