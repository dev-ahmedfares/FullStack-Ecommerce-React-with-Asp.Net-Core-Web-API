import { Col, Row } from "react-bootstrap";
import ContentLoader from "react-content-loader";

export default function ProductsSkeleton() {
  const skeletonCounter = Array(4)
    .fill(0)
    .map((_, idx) => (
      <Col
        key={idx}
        xs={6}
        md={3}
        className="d-flex justify-content-center mb-5 mt-2"
      >
         <ContentLoader
        speed={2}
        width={120}
        height={308}
        viewBox="0 0 120 308"
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
      </ContentLoader>
      </Col>
    ));
  return <Row>{skeletonCounter}</Row>;
}
