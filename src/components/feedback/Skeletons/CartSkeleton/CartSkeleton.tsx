import { Col, Row } from "react-bootstrap";
import ContentLoader from "react-content-loader";

export default function CartSkeleton() {
  return (
    <Row>
      <Col>
        <ContentLoader
          speed={2}
          width={270}
          height={180}
          viewBox="0 0 270 180"
          backgroundColor="#e8e8e8"
          foregroundColor="#f5f4f4"
        >
          <rect x="132" y="111" rx="0" ry="0" width="0" height="1" />
          <rect x="38" y="200" rx="0" ry="0" width="2" height="2" />
          <rect x="2" y="225" rx="4" ry="4" width="80" height="11" />
          <rect x="2" y="248" rx="4" ry="4" width="100" height="11" />
          <rect x="2" y="270" rx="5" ry="5" width="120" height="37" />
          <rect x="0" y="196" rx="4" ry="4" width="100" height="12" />
          <rect x="0" y="0" rx="0" ry="0" width="120" height="180" />
          <rect x="131" y="142" rx="6" ry="6" width="139" height="36" />
          <rect x="130" y="34" rx="4" ry="4" width="61" height="10" />
          <rect x="130" y="4" rx="4" ry="4" width="100" height="11" />
        </ContentLoader>
      </Col>
    </Row>
  );
}
