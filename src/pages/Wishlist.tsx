import { Banner,  WishlistItemsList } from "@components/eCommerce";
import { LottieHandler } from "@components/feedback";
import Loading from "@components/feedback/Loading";
import useWishlist from "@hooks/useWishlist";
import { Container } from "react-bootstrap";


export default function Wishlist() {
  const { products, loading, error } = useWishlist();


  return (
    <>
      <Banner
        title="WISHLIST"
        url={
          "https://www.equinoxitsol.com/blog/wp-content/uploads/2023/06/Make-an-Optimized-Shopping-Cart-1024x576.jpg"
        }
      />
      <Container fluid={"md"}>
        <Loading status={loading} error={error} type="wishlistSkeleton">
      
        {products.length > 0 ? (
            <>
              <WishlistItemsList products={products}  />
            </>
          ) : (
            <LottieHandler type="empty" message="Your wishlist is empty" />
          )}
          
        </Loading>
      </Container>
    </>
  );
}
