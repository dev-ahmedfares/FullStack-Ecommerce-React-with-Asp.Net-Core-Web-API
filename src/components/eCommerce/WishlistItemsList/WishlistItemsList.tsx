import { TProduct } from "@customTypes/index";
import WishlistItem from "../WishlistItem/WishlistItem";

type TWishlistItemProps =   {
    products:TProduct[];
};

export default function WishlistItemsList({
  products,
}: TWishlistItemProps) {
  const renderWishlistItems = products.map((product) => (
    <WishlistItem key={product.productId} {...product}   />
  ));

  return <>{renderWishlistItems}</>;
}
