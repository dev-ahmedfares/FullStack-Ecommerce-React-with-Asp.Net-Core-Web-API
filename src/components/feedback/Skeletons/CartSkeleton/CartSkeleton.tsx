import { Col, Row } from "react-bootstrap";
import ContentLoader from "react-content-loader";

export default function CartSkeleton() {
  return (
    <Row xs={1}>
    <Col>
      <ContentLoader
      className="w-100 d-none d-md-block border-1 border-secondary border-bottom"
        speed={2}
        width={1296}
        height={115}
        viewBox="0 0 1296 115"
        backgroundColor="#e8e8e8"
        foregroundColor="#f5f4f4"
      >   
        <circle cx="15" cy="60" r="10" />
        <rect x="40" y="16" rx="4" ry="4" width="75" height="90" />
        <rect x="130" y="52" rx="4" ry="4" width="160" height="20" />
        <rect x="590" y="52" rx="4" ry="4" width="120" height="20" />
        <rect x="820" y="52" rx="4" ry="4" width="120" height="20" />
        <rect x="1010" y="52" rx="4" ry="4" width="160" height="20" />
        
      </ContentLoader>
      <ContentLoader
      className="w-100 d-block d-md-none border-1 border-secondary border-bottom"
        speed={2}
        width={1296}
        height={90}
        viewBox="0 0 1296 115"
        backgroundColor="#e8e8e8"
        foregroundColor="#f5f4f4"
      >   
        <circle cx="20" cy="60" r="15" />
        <rect x="90" y="52" rx="4" ry="4" width="160" height="30" />
        <rect x="610" y="52" rx="4" ry="4" width="120" height="30" />
        <rect x="1010" y="52" rx="4" ry="4" width="140" height="30" />
        
      </ContentLoader>
    </Col>
    <Col>
      <ContentLoader
      className="w-100 d-none d-md-block border-1 border-secondary border-bottom"
        speed={2}
        width={1296}
        height={115}
        viewBox="0 0 1296 115"
        backgroundColor="#e8e8e8"
        foregroundColor="#f5f4f4"
      >   
        <circle cx="15" cy="60" r="10" />
        <rect x="40" y="16" rx="4" ry="4" width="75" height="90" />
        <rect x="130" y="52" rx="4" ry="4" width="160" height="20" />
        <rect x="590" y="52" rx="4" ry="4" width="120" height="20" />
        <rect x="820" y="52" rx="4" ry="4" width="120" height="20" />
        <rect x="1010" y="52" rx="4" ry="4" width="160" height="20" />
        
      </ContentLoader>
      <ContentLoader
      className="w-100 d-block d-md-none border-1 border-secondary border-bottom"
        speed={2}
        width={1296}
        height={90}
        viewBox="0 0 1296 115"
        backgroundColor="#e8e8e8"
        foregroundColor="#f5f4f4"
      >   
        <circle cx="20" cy="60" r="15" />
        <rect x="90" y="52" rx="4" ry="4" width="160" height="30" />
        <rect x="610" y="52" rx="4" ry="4" width="120" height="30" />
        <rect x="1010" y="52" rx="4" ry="4" width="140" height="30" />
        
      </ContentLoader>
    </Col>
    <Col>
      <ContentLoader
      className="w-100 d-none d-md-block border-1 border-secondary border-bottom"
        speed={2}
        width={1296}
        height={115}
        viewBox="0 0 1296 115"
        backgroundColor="#e8e8e8"
        foregroundColor="#f5f4f4"
      >   
        <circle cx="15" cy="60" r="10" />
        <rect x="40" y="16" rx="4" ry="4" width="75" height="90" />
        <rect x="130" y="52" rx="4" ry="4" width="160" height="20" />
        <rect x="590" y="52" rx="4" ry="4" width="120" height="20" />
        <rect x="820" y="52" rx="4" ry="4" width="120" height="20" />
        <rect x="1010" y="52" rx="4" ry="4" width="160" height="20" />
        
      </ContentLoader>
      <ContentLoader
      className="w-100 d-block d-md-none border-1 border-secondary border-bottom"
        speed={2}
        width={1296}
        height={90}
        viewBox="0 0 1296 115"
        backgroundColor="#e8e8e8"
        foregroundColor="#f5f4f4"
      >   
        <circle cx="20" cy="60" r="15" />
        <rect x="90" y="52" rx="4" ry="4" width="160" height="30" />
        <rect x="610" y="52" rx="4" ry="4" width="120" height="30" />
        <rect x="1010" y="52" rx="4" ry="4" width="140" height="30" />
        
      </ContentLoader>
    </Col>
    
  </Row>
  );
}
