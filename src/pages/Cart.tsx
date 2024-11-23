import {
  Banner,
  CartItemsList,
  CartSubtotalPrice,
} from "@components/eCommerce";
import { LottieHandler } from "@components/feedback";
import Loading from "@components/feedback/Loading";
import Heading from "@components/shared/Heading/Heading";
import useCart from "@hooks/useCart";
import { Container } from "react-bootstrap";

export default function Cart() {
  const {
    loading,
    error,
    handleDeleteProductFromCart,
    handleQuantityOfCart,
    products,
    placeOrderStatus,
  } = useCart();

 
  return (
    <>
      <Banner
        title="CART"
        url="https://capturly.com/blog/wp-content/uploads/2018/01/eCommerce-website-search-customer-experience.jpg"
      />
      <Container fluid={"md"}>
        <Heading>Shopping Cart</Heading>

        
          {placeOrderStatus === "succeeded" ? (
            <LottieHandler
              type="success"
              message="Your order has been placed successfully"
            />
          ) :
          
          (<Loading status={loading} error={error} type="cart">
            {products.length ? (
            <>
              <CartItemsList
                products={products}
                handleQuantityOfCart={handleQuantityOfCart}
                handleDelete={handleDeleteProductFromCart}
              />
              <CartSubtotalPrice products={products} />
            </>
          ) : (
            <LottieHandler type="empty" message="Your cart is empty" />
          )}
        </Loading>)}
      </Container>
    </>
  );
}
