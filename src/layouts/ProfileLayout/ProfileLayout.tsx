import { Col, Container, ListGroup, Nav, Row } from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";
import styles from "./styles.module.css";

const { col } = styles;

export default function ProfileLayout() {
  
  return (
    <Container fluid={"md"}>
      <Row className="gap-3 gap-md-0">
        <Col md={3} className={col}>
          <ListGroup defaultActiveKey="#link1">
            <ListGroup.Item as={NavLink} to={"/profile"} end>
              Account Info
            </ListGroup.Item>
            <ListGroup.Item as={NavLink} to={"orders"}>
              My Orders
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Nav fill variant="tabs" justify={false} defaultActiveKey="/profile" className="px-2 mb-4  d-md-none fw-semibold">
          <Nav.Item>
            <Nav.Link as={NavLink} to="/profile" end>ACCOUNT INFO</Nav.Link>
          </Nav.Item>
          <Nav.Item>
          <Nav.Link as={NavLink} to="orders">MY ORDERS</Nav.Link>
          </Nav.Item>
        </Nav>

        <Col>
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
}
