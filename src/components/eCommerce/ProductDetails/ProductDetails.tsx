import { TProduct } from "@customTypes/index";
import StaticStarsRating from "../StaticStarsRating/StaticStarsRating";

import { useAppDispatch, useAppSelector } from "@store/hooks";
import { changeQuantity, removeProductFromCart } from "@store/cart/cartSlice";
import { Button, Form, Spinner } from "react-bootstrap";
import styles from "./styles.module.css";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const {
  detailsParent,
  quantityList,
  parentActions,
  maxQuantity,
  description,
  starsHolder,
} = styles;
export default function ProductDetails({
  averageRating,
  productName,
  price,
  quantity,
  productId,
  productDescription,
  stockQuantity,
  reviewsCount,
}: TProduct & { averageRating: number; reviewsCount: number }) {
  const { items } = useAppSelector((state) => state.cart);
  // staticElement
  const [selectedQuantity, setSelectedQuantity] = useState(
    items[productId] ?? 1
  );

  // staticElement here problem of quantity not found in product object must came form API
  const [isBtnClicked, setIsBtnClicked] = useState(false);

  const dispatch = useAppDispatch();

  const remainingQuantity = stockQuantity - (items[productId] ?? quantity ?? 0);
  const isQuantityReachedMax = !remainingQuantity ? true : false;

  useEffect(() => {
    if (!isBtnClicked) return;
    const debounce = setTimeout(() => {
      setIsBtnClicked(false);
    }, 300);

    return () => clearTimeout(debounce);
  }, [isBtnClicked]);

  function handleAddCart(id: number, quantity: number) {
    if (quantity === 0) {
      handleRemoveFromCart();
      toast.success("Successfully Removed From Cart");
    } else {
      dispatch(changeQuantity({ id, quantity }));
      toast.success(`Quantity changed to ${quantity}`);
    }

    setIsBtnClicked(true);
  }

  function handleRemoveFromCart() {
    dispatch(removeProductFromCart(productId));
    toast.success("Successfully removed from cart")
  }

  const quantityArr = Array(stockQuantity + 1)
    .fill(0)
    .map((_, idx) => {
      const value = idx++;
      return (
        <option key={idx} value={value}>
          {value}
        </option>
      );
    });

  return (
    <div className={detailsParent}>
      <div>
        <h2>{productName}</h2>
        <p>${price && price.toFixed(2)}</p>
      </div>
      <div className={starsHolder}>
        {/* staticElement fix rating and add averageRating*/}
        <div>
          <StaticStarsRating rating={averageRating} size={17} />
          {reviewsCount ? <span>( {reviewsCount} reviews)</span> : null}
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ut
          ullamcorper leo, eget euismod orci. Cum sociis natoque penatibus et
          magnis dis parturient montes nascetur ridiculus mus. Vestibulum
          ultricies aliquam convallis.
        </p>
      </div>

      <div>
        <p className={maxQuantity}>
          {isQuantityReachedMax
            ? "You reach to the limit"
            : `You can add ${remainingQuantity} item(s)`}
        </p>
        <div className={parentActions}>
          <div className={quantityList}>
            <span className=" d-block">Quantity</span>
            <Form.Select
              aria-label="Select Quantity"
              value={selectedQuantity}
              disabled={isQuantityReachedMax}
              onChange={(e) => setSelectedQuantity(+e.target.value)}
            >
              {quantityArr}
            </Form.Select>
          </div>
          {isQuantityReachedMax ? (
            <Button
              disabled={isBtnClicked}
              onClick={() => handleRemoveFromCart()}
              variant="primary"
            >
              {isBtnClicked ? (
                <div className="d-flex align-items-center gap-2 m-0 justify-content-center">
                  <Spinner size="sm" animation="border" />{" "}
                </div>
              ) : (
                "REMOVE FROM CART"
              )}
            </Button>
          ) : (
            <Button
              disabled={isBtnClicked || isQuantityReachedMax}
              onClick={() => handleAddCart(+productId, +selectedQuantity)}
              variant="primary"
            >
              {isBtnClicked ? (
                <div className="d-flex align-items-center gap-2 m-0 justify-content-center">
                  <Spinner size="sm" animation="border" />{" "}
                </div>
              ) : (
                "ADD TO CART"
              )}
            </Button>
          )}
        </div>
      </div>
      <div className={description}>
        <h3>Description</h3>
        <p>{productDescription}</p>
      </div>
    </div>
  );
}
