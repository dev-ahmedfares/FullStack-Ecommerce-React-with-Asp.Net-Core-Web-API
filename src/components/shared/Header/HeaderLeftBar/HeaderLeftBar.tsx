import Logo from "@assets/svg/cart.svg?react";
import Wishlist from "@assets/svg/wishlist.svg?react";
import { useAppSelector } from "@store/hooks";
import { handleTotalQuantity } from "@store/Selectors";
import HeaderCounter from "../HeaderCounter/HeaderCounter";

export default function HeadersCounter() {
  const  cartTotalQuantity = useAppSelector(handleTotalQuantity);

  const wishlistTotalQuantity = useAppSelector((state) => state.wishlist.productsId.length);
 
  return (
    <div className="d-flex gap-4 align-items-center">
      <HeaderCounter
        totalQuantity={wishlistTotalQuantity}
        svgLogo={<Wishlist title={"Wishlist"} />}
        path="/wishlist"

      />
      <HeaderCounter
        totalQuantity={cartTotalQuantity}
        svgLogo={<Logo title={"Cart"} />}
        path="/cart"
      />
    </div>
  );
}
