import { TProduct } from "@customTypes/index";
import styles from "./styles.module.css";
import { Button, Modal, Spinner } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useState } from "react";
import { actConfirmOrder } from "@store/order/orderSlice";
import { clearCartAfterPlaceOrder } from "@store/cart/cartSlice";


export default function CartSubtotalPrice({
  products,
}: {
  products: TProduct[];
}) {
  const subtotalPrice = products.reduce((acc, el) => {
    if (el.quantity) {
      return acc + el.price * el.quantity;
    } else {
      return acc;
    }
  }, 0);

  const [showModal, setShowModal] = useState(false);
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const [confirmOrderLoading, setConfirmOrderLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  const modalHandler = () => {
    setShowModal((curr) => !curr);
    setError(null);
  };

  const confirmOrderHandler = () => {
    setConfirmOrderLoading(true);
    dispatch(actConfirmOrder(subtotalPrice))
      .unwrap()
      .then(() => {
        dispatch(clearCartAfterPlaceOrder());
        setShowModal(false);


      })
      .catch((err) => setError(err))
      .finally(() => setConfirmOrderLoading(false));
  };

  return (
    <>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showModal}
        onHide={modalHandler}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            PLACING ORDER
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className={styles.confirmText}>
            Are you sure you want to place order with Subtotal:{" "}
            <span>${subtotalPrice.toFixed(2)}</span> 
          </p>
          {!confirmOrderLoading && error && <p className="text-danger">{error}</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={modalHandler} variant="secondary">
            Close
          </Button>
          <Button onClick={confirmOrderHandler} disabled={confirmOrderLoading}>
            {confirmOrderLoading ? (
              <>
                <Spinner animation="border" size="sm"></Spinner> Loading...
              </>
            ) : (
              "Confirm"
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      <div className={styles.container}>
        <span >SUBTOTAL:</span>
        <span>${subtotalPrice.toFixed(2)}</span>
      </div>
      {accessToken && (
        <div className="text-end mt-4">
          <Button
            variant="primary"
            className="text-white"
            onClick={() => setShowModal(true)}
          >
            PLACE ORDER
          </Button>
        </div>
      )}
    </>
  );
}
