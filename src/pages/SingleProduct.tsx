import {
  TabsSingleProduct,
  ProductMainDetails,
  Product,
} from "@components/eCommerce";
import Loading from "@components/feedback/Loading";

import GridList from "@components/shared/GridList/GridList";
import { TProduct } from "@customTypes/index";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  actGetSingleProduct,
  singleProductCleanUp,
} from "@store/Product/productSlice";
import {
  actGetReviewByProductId,
  reviewCleanUp,
} from "@store/Review/reviewSlice";
import { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

export default function SingleProduct() {
  const params = useParams();
  const productId = Number(params.productId);

  const dispatch = useAppDispatch();

  const cartItems = useAppSelector((state) => state.cart.items);

  const likedProducts = useAppSelector((state) => state.wishlist.productsId);

  const {
    accessToken
  } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const promise = dispatch(
      actGetSingleProduct({ productId, withRelated: true })
    );

    promise.then((value) => {
      if (value.meta.requestStatus === "rejected") return;
      dispatch(actGetReviewByProductId(productId));
    });

    return () => {
      promise.abort();
      dispatch(singleProductCleanUp());
      dispatch(reviewCleanUp());
    };
  }, [dispatch, productId]);

  const {
    singleProduct,
    records,
    loadingSingleProduct,
    error,
  } = useAppSelector((state) => state.products);

  const relatedProduct = records.filter(
    (product) => product.productId !== singleProduct?.productId
  );
  const productsFullInfo = relatedProduct.map((el) => ({
    ...el,
    quantity: cartItems[el.productId] || 0,
    isLiked: likedProducts.includes(el.productId),
    isAuthenticated: accessToken ? true : false,
  }));

  const {
    loading: loadingReview,
    error: errorReview,
    reviews,
  } = useAppSelector((state) => state.review);

  const allReviewsCount =
    reviews.length > 0 ? reviews.reduce((acc, el) => acc + el.rating, 0) : 0;
  const averageRating =
    Math.round((allReviewsCount / (reviews.length * 5)) * 5) || 0;


     // Scroll to top when component is mounted
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
          <Loading status={loadingSingleProduct} error={error} type="singleProduct">
            <ProductMainDetails
              averageRating={averageRating}
              reviewsCount={reviews.length}
              singleProduct ={singleProduct as TProduct}
            />

            <TabsSingleProduct
              reviews={reviews}
              {...singleProduct as TProduct}
              errorReview={errorReview}
              loadingReview={loadingReview}
            />
          
        <Container fluid={"md"}>
          <Row className="pt-5 ">
            <h4 className="fs-5 mb-3">RELATED PRODUCTS</h4>
            <GridList
            message="There Are no products"
              records={productsFullInfo}
              renderItem={(item) => <Product {...item} />}
            />
          </Row>
        </Container>
    </Loading>
  );
}
