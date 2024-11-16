
import Card from "@components/eCommerce/Card/Card";
import { LottieHandler } from "@components/feedback";
import Loading from "@components/feedback/Loading";
import Heading from "@components/shared/Heading/Heading";
import { OrderItem } from "@customTypes/index";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGetOrders, resetOrderStatus } from "@store/order/orderSlice";
import { useEffect, useState } from "react";
import { Col, Modal, Row, Table } from "react-bootstrap";

export default function Orders() {
  const dispatch = useAppDispatch();
  const { ordersList, loading, error } = useAppSelector(
    (state) => state.orders
  );
  const [showModal, setShowModal] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState<OrderItem[]>([]);

  const modalHandler = () => {
    setShowModal(false);
    setSelectedProduct([]);
  };
  const viewDetailsHandler = (id: number) => {
    const productDetails = ordersList.find((item) => item.id === id);
    const newItems= productDetails?.items.map((item)=> ({

      ...item,
      img:item.img 
    })) ?? [];

    setShowModal(true);
    
    setSelectedProduct(newItems);
  };

  useEffect(() => {
    const promise = dispatch(actGetOrders());
    return () => {
      promise.abort();
      dispatch(resetOrderStatus());
    };
  }, [dispatch]);

  return (
    <>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showModal}
        onHide={modalHandler}
      >
        <Modal.Header closeButton className="border-0 pb-2 pt-3">
          <Modal.Title id="contained-modal-title-vcenter" >
            Product Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: "600px" }} className="overflow-y-auto">
          <Row className="gap-3  column-gap-md-0">
            {selectedProduct.map((item:OrderItem) => (
              <Col key={`${item.productId}`} md={6}>
                <div >
                  <Card {...item}/>
                </div>
              </Col>
            ))}
          </Row>
        </Modal.Body>
      </Modal>
      <Heading style="mt-0 mb-3">Orders List</Heading>
      <Loading type="table" error={error} status={loading}>
        {ordersList.length > 0 ? <Table striped bordered hover>
          <thead>
            <tr>
              <th>Order Number</th>
              <th>items</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {ordersList.map((item) => (
              <tr key={item.id}>
                <td>#{item.id}</td>
                <td>
                  {item.items.length} item(s) /{" "}
                  <span
                    onClick={() => viewDetailsHandler(item.id)}
                    className="text-decoration-underline"
                    role="button"
                  >
                    Product Details
                  </span>
                </td>
                <td style={{fontFamily:"Montserrat,sans-serif"}}>${item.subtotal.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </Table> : <>
            <LottieHandler type="empty" message="there are no orders"/>
        </>}
      </Loading>
    </>
  );
}
