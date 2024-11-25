
import { Col, Row } from 'react-bootstrap'
import ContentLoader from 'react-content-loader'

export default function DashboardSkeleton() {
    const dashboardSkeleton = Array(6)
    .fill(0)
    .map((_, idx) => (
        <Col className='p-0' key={idx}>
        <ContentLoader
        className="w-100  border-1 border-secondary border-bottom"
          speed={2}
          width={1296}
          height={100}
          viewBox="0 0 1296 100"
          backgroundColor="#e8e8e8"
          foregroundColor="#f5f4f4"
        >   
          
          <rect x="25" y="10" rx="4" ry="4" width="82" height="80" />
          <rect x="130" y="42" rx="4" ry="4" width="120" height="20" />
          <rect x="280" y="42" rx="4" ry="4" width="90" height="20" />
          <rect x="440" y="42" rx="4" ry="4" width="130" height="20" />
          <rect x="590" y="42" rx="4" ry="4" width="120" height="20" />
          <rect x="760" y="42" rx="4" ry="4" width="90" height="20" />
          <rect x="940" y="42" rx="4" ry="4" width="110" height="20" />
          <rect x="1110" y="42" rx="4" ry="4" width="150" height="20" />
          
          
        </ContentLoader>
        
      </Col>
      
    ));
  return <Row xs={1}>{dashboardSkeleton}</Row>;
  

}
