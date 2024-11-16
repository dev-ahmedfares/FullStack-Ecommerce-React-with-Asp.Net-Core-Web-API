import { Banner, ShopList } from "@components/eCommerce";
import { Container } from "react-bootstrap";


export default function Products() {
  
  
  return (
    <>
      <Banner title="Products" className="mb-4 mb-lg-5"/>
      <Container fluid={"md"}>
        <ShopList />
      </Container>
    </>
  );
}
