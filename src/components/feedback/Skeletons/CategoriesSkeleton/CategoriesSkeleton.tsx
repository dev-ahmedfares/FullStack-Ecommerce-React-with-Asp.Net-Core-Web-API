import { Col, Row } from "react-bootstrap";
import ContentLoader from "react-content-loader";

export default function CategoriesSkeleton() {
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
          width={180}
          height={225}
          viewBox="0 0 180 225"
          backgroundColor="#e8e8e8"
          foregroundColor="#f5f4f4"
        >
          <rect x="132" y="111" rx="0" ry="0" width="0" height="1" />
          <rect x="38" y="200" rx="0" ry="0" width="2" height="2" />
          <rect x="52" y="202" rx="4" ry="4" width="80" height="11" />
          <circle cx="90" cy="90" r="90" />
        </ContentLoader>
      </Col>
    ));
  return <Row>{skeletonCounter}</Row>;
}
