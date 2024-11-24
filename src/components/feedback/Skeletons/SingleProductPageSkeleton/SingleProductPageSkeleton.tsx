import { Col, Container, Row } from "react-bootstrap";
import ContentLoader from "react-content-loader";

export default function SingleProductPageSkeleton() {
  return (
    <Container fluid={"md"}>
      <Row xs={1} lg={2} className="mt-5">
        <Col className="overflow-hidden d-none d-lg-block">
          <ContentLoader
            speed={2}
            width={692}
            height={693}
            viewBox="0 0 692 693"
            backgroundColor="#e8e8e8"
            foregroundColor="#f5f4f4"
          >
            <rect x="97" y="1" rx="0" ry="0" width="495" height="467" />
            <rect x="91" y="169" rx="0" ry="0" width="0" height="1" />
            <rect x="-1" y="241" rx="0" ry="0" width="87" height="106" />
            <rect x="2" y="359" rx="0" ry="0" width="84" height="106" />
            <rect x="0" y="122" rx="0" ry="0" width="85" height="106" />
            <rect x="1" y="2" rx="0" ry="0" width="85" height="106" />
          </ContentLoader>
        </Col>
        <Col className="overflow-hidden d-none d-lg-block">
          <ContentLoader
            speed={2}
            width={692}
            height={693}
            viewBox="0 0 692 693"
            backgroundColor="#e8e8e8"
            foregroundColor="#f5f4f4"
          >
            <rect x="91" y="169" rx="0" ry="0" width="0" height="1" />
            <rect x="3" y="5" rx="4" ry="4" width="296" height="26" />
            <rect x="3" y="41" rx="4" ry="4" width="145" height="26" />
            <rect x="2" y="169" rx="4" ry="4" width="140" height="26" />
            <rect x="3" y="129" rx="4" ry="4" width="580" height="34" />
            <rect x="4" y="342" rx="4" ry="4" width="581" height="104" />
            <rect x="3" y="304" rx="4" ry="4" width="132" height="26" />
            <rect x="3" y="245" rx="4" ry="4" width="328" height="36" />
            <rect x="4" y="97" rx="4" ry="4" width="106" height="26" />
            <rect x="3" y="210" rx="4" ry="4" width="181" height="26" />
          </ContentLoader>
        </Col>
        <Col className="overflow-hidden d-lg-none">
          <div className="overflow-hidden">
          <ContentLoader
            speed={2}
            width={700}
            height={693}
            viewBox="0 0 692 693"
            backgroundColor="#e8e8e8"
            foregroundColor="#f5f4f4"
            className="overflow-hidden"
          >
            <rect x="91" y="169" rx="0" ry="0" width="0" height="1" />
            <rect x="3" y="479" rx="0" ry="0" width="94" height="95" />
            <rect x="2" y="-4" rx="0" ry="0" width="589" height="464" />
            <rect x="112" y="480" rx="0" ry="0" width="94" height="95" />
            <rect x="222" y="481" rx="0" ry="0" width="94" height="95" />
            <rect x="332" y="480" rx="0" ry="0" width="94" height="95" />
          </ContentLoader>
          
           <ContentLoader
            speed={2}
            width={692}
            height={693}
            viewBox="0 0 692 693"
            backgroundColor="#e8e8e8"
            foregroundColor="#f5f4f4"
          >
            <rect x="91" y="169" rx="0" ry="0" width="0" height="1" />
            <rect x="3" y="5" rx="4" ry="4" width="296" height="26" />
            <rect x="3" y="41" rx="4" ry="4" width="145" height="26" />
            <rect x="2" y="169" rx="4" ry="4" width="140" height="26" />
            <rect x="3" y="129" rx="4" ry="4" width="580" height="34" />
            <rect x="4" y="342" rx="4" ry="4" width="581" height="104" />
            <rect x="3" y="304" rx="4" ry="4" width="132" height="26" />
            <rect x="3" y="245" rx="4" ry="4" width="328" height="36" />
            <rect x="4" y="97" rx="4" ry="4" width="106" height="26" />
            <rect x="3" y="210" rx="4" ry="4" width="181" height="26" />
          </ContentLoader> 
          </div>
        </Col>
      </Row>
    </Container>
  );
}
