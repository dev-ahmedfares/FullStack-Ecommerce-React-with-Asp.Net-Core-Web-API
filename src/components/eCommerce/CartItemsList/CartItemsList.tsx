import { TProduct } from "@customTypes/index";
import CartItem from "../CartItem/CartItem";

type CartItemsListProps = {
  products: TProduct[];
  handleQuantityOfCart: (id:number,quantity:number) => void;
  handleDelete: (id:number) => void;
};

export default function CartItemsList({ products,handleQuantityOfCart,handleDelete }: CartItemsListProps) {
  const renderCartItems = products.map((el) => (
    <CartItem key={el.productId} {...el} handleQuantityOfCart={handleQuantityOfCart} handleDelete={handleDelete}/>
  ));
  return <>{renderCartItems}</>;
}
