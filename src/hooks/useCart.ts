import {
  actGetCartProductsByItem,
  cartCleanUp,
  changeQuantity,
  removeProductFromCart,
} from "@store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { resetOrderStatus } from "@store/order/orderSlice";
import { useCallback, useEffect } from "react";

export default function useCart() {
  const { productsFullInfo, items, loading, error } = useAppSelector(
    (state) => state.cart
  );
  const placeOrderStatus= useAppSelector(state=>state.orders.loading)
  const products = productsFullInfo.map((el) => {
    return { ...el, quantity: items[el.productId] };
  });

  const dispatch = useAppDispatch();

  const handleQuantityOfCart = useCallback(
    (id: number, quantity: number) => {
      dispatch(changeQuantity({ id, quantity }));
    },
    [dispatch]
  );

  const handleDeleteProductFromCart = useCallback(
    (id: number) => {
      dispatch(removeProductFromCart(id));
    },
    [dispatch]
  );

  useEffect(() => {
    const promise = dispatch(actGetCartProductsByItem());

    return () => {
      promise.abort();
      dispatch(cartCleanUp());
      dispatch(resetOrderStatus())
    };
    
  }, [dispatch]);



  return {
    loading,
    error,
    handleDeleteProductFromCart,
    handleQuantityOfCart,
    products,
    placeOrderStatus
  };
}
