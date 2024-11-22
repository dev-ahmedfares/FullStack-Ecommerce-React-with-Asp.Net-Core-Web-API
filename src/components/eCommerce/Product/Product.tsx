import { Button, Spinner } from "react-bootstrap";
import styles from "./styles.module.css";
import { TProduct } from "@customTypes/index";
import { useAppDispatch } from "@store/hooks";
import { addToCart } from "@store/cart/cartSlice";
import { memo, useEffect, useState } from "react";
import Like from "@assets/svg/like.svg?react";
import LikeFill from "@assets/svg/like-fill.svg?react";
import { actToggleLike } from "@store/wishlist/wishlistSlice";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const { product, productImg, maximumNotice, wishlistBtn, productInfo } = styles;

const Product = memo(
  ({
    productId,
    price,
    productImages,
    productName,
    stockQuantity,
    quantity,
    isLiked,
    isAuthenticated,
  }: TProduct) => {
    const dispatch = useAppDispatch();
    const [isBtnClicked, setIsBtnClicked] = useState(false);
    const remainingQuantity = stockQuantity - (quantity ?? 0);
    const isQuantityReachedMax = !remainingQuantity ? true : false;
    const [isToggleLike, setIsToggleLike] = useState(false);
    const navigate = useNavigate()
    
   const {imagePath}=productImages[0]
   
    useEffect(() => {
      if (!isBtnClicked) return;
      const debounce = setTimeout(() => {
        setIsBtnClicked(false);
      }, 300);

      return () => clearTimeout(debounce);
    }, [isBtnClicked]);

    function handleAddCart() {
      dispatch(addToCart(productId));
      setIsBtnClicked(true);
      toast.success("Successfully added to cart")
    }

    function handleToggleLike(productId: number) {
      if (isToggleLike) return;
      setIsToggleLike(true);
      dispatch(actToggleLike(productId))
        .unwrap()
        .then(() => {
          setIsToggleLike(false)
          if (!isLiked) {
            toast.success("Successfully added to wishlist")
          } else {
            toast.success("Successfully removed from wishlist")

          }
        })
        .catch(() => setIsToggleLike(false));
    }

   
    return (
      <div className={product}>
        <Link to={`/products/${productId}`} >
          <div className={productImg}>
            <img src={imagePath} alt={productName} />
          </div>
        </Link>

        <div className={productInfo}>
          
            <div className={wishlistBtn}>
              <div>wishlist</div>
              <div onClick={() => {
                if (isAuthenticated) {
                  handleToggleLike(productId)

                } else {
                  navigate("/login?message=login_required")
                }
              }}>
                {isToggleLike ? (
                  <Spinner animation="border" size="sm" variant="primary" />
                ) : isLiked ? (
                  <LikeFill />
                ) : (
                  <Like />
                )}
              </div>
            </div>
          
          <h2>{productName}</h2>
          <p className={maximumNotice}>
            {isQuantityReachedMax
              ? "You reach to the limit"
              : `You can add ${remainingQuantity} item(s)`}
          </p>

          <div>
            <h3>${price.toFixed(2)}</h3>

            <Button
              disabled={isBtnClicked || isQuantityReachedMax}
              onClick={handleAddCart}
              variant=""
            >
              {isBtnClicked ? (
                <div className="d-flex align-items-center gap-2 m-0">
                  <Spinner size="sm" animation="border" />{" "}
                </div>
              ) : (
                "ADD TO CART"
              )}
            </Button>
          </div>
        </div>
      </div>
    );
  }
);
export default Product;
