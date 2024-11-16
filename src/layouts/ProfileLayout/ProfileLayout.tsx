import { Col, Container, ListGroup, Row } from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";
import styles from "./styles.module.css"

const {col} = styles

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

        <Col>
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
}
