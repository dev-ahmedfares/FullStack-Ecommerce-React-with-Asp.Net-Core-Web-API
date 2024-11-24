import { Col, Row } from "react-bootstrap";
import ContentLoader from "react-content-loader";

export default function ProductsSkeleton() {
  const skeletonCounter = Array(8)
    .fill(0)
    .map((_, idx) => (
      <Col
        key={idx}
        sm={6}
        md={4}
        lg={3}
        xxl={3}
        className="d-flex justify-content-center mb-5 mt-2"
      >
        <ContentLoader 
    speed={2}
    width={306}
    height={450}
    
    viewBox="0 0 306 450"
    backgroundColor="#e8e8e8"
    foregroundColor="#f5f4f4"
    
  >
    <rect x="-32" y="1" rx="0" ry="0" width="336" height="347" /> 
    <rect x="91" y="169" rx="0" ry="0" width="0" height="1" /> 
    <rect x="65" y="365" rx="5" ry="5" width="186" height="19" /> 
    <rect x="66" y="392" rx="5" ry="5" width="183" height="19" /> 
    <rect x="113" y="452" rx="5" ry="5" width="96" height="19" /> 
    <rect x="110" y="420" rx="5" ry="5" width="104" height="19" />
  </ContentLoader>
      </Col>
    ));
  return <Row>{skeletonCounter}</Row>;
}
