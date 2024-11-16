import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGetWishlist, wishlistCleanUp } from "@store/wishlist/wishlistSlice";
import { useEffect, useState } from "react";

export default function useWishlist() {
  const [currentPage,setCurrentPage] = useState(1)
  // const pageSize = 10
  const dispatch = useAppDispatch();
  const { productsFullInfo, loading, error ,isTheLastPage} = useAppSelector(
    (state) => state.wishlist
  );

  const cartItems = useAppSelector((state) => state.cart.items);

  useEffect(() => {
    const promise = dispatch(actGetWishlist({data:"productsFullInfo",currentPage}));

    return () => {
      promise.abort();
      dispatch(wishlistCleanUp());
    };
  }, [dispatch,currentPage]);
 

  const allProducts = productsFullInfo.filter(Boolean)
  const products = allProducts.map((prod) => {
    return {
      ...prod,
      isLiked: true,
      quantity: cartItems[prod.productId],
      isAuthenticated: true,
    };
  });

  return { products, loading, error,setCurrentPage,isTheLastPage,currentPage };
}
