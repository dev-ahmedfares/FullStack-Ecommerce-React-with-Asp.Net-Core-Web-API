import { Banner, ShopList } from "@components/eCommerce";
import { useEffect } from "react";
import { Container } from "react-bootstrap";


export default function Products() {

      // Scroll to top when component is mounted
      useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
  
  return (
    <>
      <Banner title="Products" className="mb-4 mb-lg-5"/>
      <Container fluid={"md"}>
        <ShopList />
      </Container>
    </>
  );
}
