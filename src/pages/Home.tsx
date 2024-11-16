import CategorySection from "@components/eCommerce/CategorySection/CategorySection";
import Deal from "@components/eCommerce/Deal/Deal";
import Slider from "@components/eCommerce/Slider/Slider";
import { Col, Container, Row } from "react-bootstrap";

export default function Home() {
  return (
    <>
      <Container fluid={"md"}>
        <div>
          <Slider />
        </div>
        <div className="my-5">{<CategorySection />}</div>
        <Row xs={1} md={2} className="gap-4 gap-md-0">
          <Col>
            <Deal
              productName="Lucent"
              dealTitle="Get the deal in here"
              imgUrl={
                "https://depot.qodeinteractive.com/wp-content/uploads/2017/01/product-49-gallery-3.jpg"
              }
            />
          </Col>
          <Col>
            <Deal
              productName="Vivid"
              dealTitle="Discount everyday"
              imgUrl={
                "https://depot.qodeinteractive.com/wp-content/uploads/2017/01/h6-product-51.jpg"
              }
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}
