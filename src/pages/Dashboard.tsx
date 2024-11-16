import { Banner, TableList } from "@components/eCommerce";

import { Container } from "react-bootstrap";


export default function Dashboard() {


 
  return (
    <>
      <Banner title="Dashboard" />
      <Container fluid={"md"}>
        <TableList />
      </Container>
    </>
  );
}
