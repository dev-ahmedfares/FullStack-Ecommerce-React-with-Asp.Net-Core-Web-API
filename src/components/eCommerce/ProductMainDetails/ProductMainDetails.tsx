import { ImageGallery, ProductDetails } from "@components/eCommerce";
import { TProduct } from "@customTypes/index";
import { Col, Container, Row } from "react-bootstrap";

import styles from "./styles.module.css";
import Breadcrumb from "../BreadCrumb/BreadCrumbLinks";

const { parent, breadCrumbCss } = styles;

export default function ProductMainDetails({
  singleProduct,
  averageRating,
  reviewsCount,
}: {
  singleProduct: TProduct;
  averageRating: number;
  reviewsCount: number;
}) {
  const imgArr = singleProduct.productImages.map((image, idx) => ({
    img: image.imagePath,
    num: idx++,
  }));

  return (
    <div className={parent}>
      <Container fluid={"md"}>
        <div className="d-flex justify-content-center">
          <Breadcrumb
            className={breadCrumbCss}
            lastName={singleProduct.productName}
          />
        </div>

        <Row xs={1} lg={2} className="gap-5 gap-lg-0">
          <Col>
            <ImageGallery imgArr={imgArr} />
          </Col>
          <Col>
            <ProductDetails
              averageRating={averageRating}
              {...singleProduct}
              reviewsCount={reviewsCount}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
