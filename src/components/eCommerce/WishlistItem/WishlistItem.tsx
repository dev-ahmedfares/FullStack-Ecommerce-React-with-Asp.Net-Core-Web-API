import { TProduct } from "@customTypes/index";
import styles from "./styles.module.css";
import { Button, CloseButton, Spinner } from "react-bootstrap";
import { memo, useEffect, useState } from "react";
import { addToCart, removeProductFromCart } from "@store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actToggleLike } from "@store/wishlist/wishlistSlice";

const { tableParent, productImg, btnAddCart } = styles;

type TWishlistItemProps = TProduct;

const WishlistItem = memo(
  ({
    productId,
    productName,
    price,
    productImages,
    stockQuantity,
  }: TWishlistItemProps) => {
    const dispatch = useAppDispatch();
    const [isBtnClicked, setIsBtnClicked] = useState(false);
    const [isToggleLike, setIsToggleLike] = useState(false);
    const [isAddedToCart,setIsAddedToCart] = useState(false)
    const {items} = useAppSelector(state=> state.cart)

    useEffect(() => {
      if (!isBtnClicked) return;
      const debounce = setTimeout(() => {
        setIsBtnClicked(false);
      }, 300);

      return () => clearTimeout(debounce);
    }, [isBtnClicked]);

    const handleDeleteFromWishlist = (productId: number) => {
      if (isToggleLike) return;
      setIsToggleLike(true);
      dispatch(actToggleLike(productId))
        .unwrap()
        .then(() => setIsToggleLike(false))
        .catch(() => setIsToggleLike(false));
    };

    useEffect(()=>{
      if (Object.keys(items).includes(String(productId))) {
        setIsAddedToCart(true)
      } else {
        setIsAddedToCart(false)
      }
    },[items,productId])

    // staticElement need to handle after implement cart
    function handleAddCart() {
      dispatch(addToCart(productId))
      setIsBtnClicked(true);
    }


    function handleRemoveFromCart() {
      dispatch(removeProductFromCart(productId))
      setIsBtnClicked(true);
      setIsAddedToCart(false)
    }

    return (
      <div className={tableParent}>
        <table>
          <tbody>
            <tr>
              <td className="d-flex align-items-center gap-3">
                {isToggleLike ? (
                  <Spinner size="sm" animation="border" />
                ) : (
                  <CloseButton
                    style={{ color: "white" }}
                    onClick={() => handleDeleteFromWishlist(+productId)}
                  />
                )}
                <div className={productImg}>
                  <img src={productImages[0].imagePath} alt={productName} />
                </div>
              </td>
              <td>
                <h2>{productName}</h2>
              </td>
              <td>
                <h3>${price.toFixed(2)}</h3>
              </td>
              <td className="d-none d-md-block">
                <h3>{stockQuantity >= 1 ? "In stock" : "Out of stock"}</h3>
              </td>

              <td>
                {stockQuantity >= 1 && (isAddedToCart ? (
                  <Button
                    className={btnAddCart}
                    disabled={isBtnClicked}
                    onClick={handleRemoveFromCart}
                    variant=""
                  >
                    {isBtnClicked ? (
                      <div className="d-flex align-items-center gap-2 m-0">
                        <Spinner size="sm" animation="border" />{" "}
                      </div>
                    ) : (
                      "REMOVE FROM CART"
                    )}
                  </Button>
                ) : (
                  <Button
                    className={btnAddCart}
                    disabled={isBtnClicked}
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
                )) }
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
);

export default WishlistItem;
