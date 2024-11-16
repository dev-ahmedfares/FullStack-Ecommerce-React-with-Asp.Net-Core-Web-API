import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
const { footerContainer } = styles;

const Footer = () => {
  return (
    <footer className={footerContainer}>
      <Container>
        <Row xs={1} sm={2} lg={4} className="row-gap-4 row-gap-lg- text-center  text-sm-start">
          <Col>
            <h3>customer service</h3>
            <ul>
              <li>
                <Link to={"/"}>Help & Contact Us</Link>
              </li>
              <li>
                <Link to={"/"}>Returns & Refunds</Link>
              </li>
              <li>
                <Link to={"/"}>Online Stores</Link>
              </li>
              <li>
                <Link to={"/"}>Terms & Conditions</Link>
              </li>
            </ul>
          </Col>
          <Col>
            <h3>company</h3>
            <ul>
              <li>
                <Link to={"/"}>What We Do</Link>
              </li>
              <li>
                <Link to={"/"}>Available Services</Link>
              </li>
              <li>
                <Link to={"/"}>Latest Posts</Link>
              </li>
              <li>
                <Link to={"/"}>FAQs</Link>
              </li>
            </ul>
          </Col>
          <Col>
            <h3>social media</h3>
            <ul>
              <li>
                <Link to={"/"}>Twitter</Link>
              </li>
              <li>
                <Link to={"/"}>Instagram</Link>
              </li>
              <li>
                <Link to={"/"}>Tumblr</Link>
              </li>
              <li>
                <Link to={"/"}>Facebook</Link>
              </li>
            </ul>
          </Col>
          <Col>
            <h3>Profile</h3>
            <ul>
              <li>
                <Link to={"/"}>My Account</Link>
              </li>
              <li>
                <Link to={"/"}>Checkout</Link>
              </li>
              <li>
                <Link to={"/"}>Order Tracking</Link>
              </li>
              <li>
                <Link to={"/"}>Help & Support</Link>
              </li>
            </ul>
          </Col>
        </Row>
        <Row>
          <Col>
            @{new Date().getFullYear()}{" "}
            <Link to={"https://www.linkedin.com/in/dev-ahmedfares/"}>
              AHMED FARES
            </Link>
             {" "}.All Rights Reserved
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
