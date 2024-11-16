import { Form, CloseButton } from "react-bootstrap";
import styles from "./styles.module.css";
import { TProduct } from "@customTypes/index";
import { memo } from "react";

const { tableParent, productImg, tableParentSelection } = styles;

type TCartItemProps = TProduct & {
  handleQuantityOfCart: (id: number, quantity: number) => void;
  handleDelete: (id: number) => void;
};

const CartItem = memo(
  ({
    productImages,
    productId,
    productName,
    price,
    stockQuantity,
    quantity,
    handleQuantityOfCart,
    handleDelete,
  }: TCartItemProps) => {
    const quantityArr = Array(stockQuantity)
      .fill(0)
      .map((_, idx) => {
        const value = ++idx;
        return (
          <option key={idx} value={value}>
            {value}
          </option>
        );
      });

    const totalPriceOfItem = (quantity ?? 1) * price;
      
    return (
      <div className={tableParent}>
        <table>
          <tbody>
            <tr>
              <td className="d-flex align-items-center gap-3">
                <CloseButton
                  style={{ color: "white" }}
                  onClick={() => handleDelete(+productId)}
                />
                <div className={productImg}>
                  <img src={productImages[0].imagePath} alt={productName} />
                </div>
              </td>
              <td>
                <h2>{productName}</h2>
              </td>
              <td className="d-none d-md-block">
                <h3>${price.toFixed(2)}</h3>
              </td>
              <td>
                <div className={tableParentSelection}>
                  <span className="d-none d-lg-block">Quantity</span>
                  <Form.Select
                    aria-label="Default select example"
                    value={quantity}
                    onChange={(e) => handleQuantityOfCart(+productId, +e.target.value)}
                  >
                    {quantityArr}
                  </Form.Select>
                </div>
              </td>

              <td>
                <h3>${totalPriceOfItem.toFixed(2)}</h3>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
);

export default CartItem;
