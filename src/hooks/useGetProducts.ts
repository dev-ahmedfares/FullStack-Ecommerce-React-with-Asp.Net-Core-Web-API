
import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  actGetProductByPrefix,
  productsCleanUp,
} from "@store/Product/productSlice";
import { useEffect } from "react";

type TPrefix ={
  pageNumber:number,
  pageSize:number,
  filterQuery?:string,
  refresh?:boolean
}

export default function useGetProducts(prefix:TPrefix) {
  
  const { loading, error, records,isTheLastPage,singleProduct} = useAppSelector((state) => state.products);

  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);

  const likedProducts = useAppSelector((state) => state.wishlist.productsId);
  const {accessToken}= useAppSelector(state=> state.auth)
    
 const{pageNumber,pageSize,filterQuery,refresh = false}= prefix

  useEffect(() => {
    const promise = dispatch(actGetProductByPrefix({pageNumber,pageSize,filterQuery}));
    return () => {
      promise.abort()
      dispatch(productsCleanUp());
    };
  }, [dispatch,pageNumber,pageSize,filterQuery,refresh]);



  const productsFullInfo =records ? records.map((el) => ({
    ...el,
    quantity: cartItems[el.productId] || 0,
    isLiked: likedProducts.includes(el.productId),
    isAuthenticated:accessToken ? true :false
  })) : [];
 
  return {loading, error,productsFullInfo,isTheLastPage,singleProduct };
}
