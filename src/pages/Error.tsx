import { LottieHandler } from "@components/feedback";
import { Container } from "react-bootstrap";
import {  Link } from "react-router-dom"


export default function Error() {
    // const error = useRouteError()
    // let errorStatus:number;
    // let errorText:string;

    // if (isRouteErrorResponse(error)) {
    //     errorStatus= error.status;
    //     errorText= error.statusText;
    // } else {
    //     errorStatus= 404;
    //     errorText= "Page Not Found";
    // }

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center mt-5 pt-5" >
    <LottieHandler type="notFound"/>
    <Link to="/" replace={true}>
      How about going back to safety?
    </Link>
  </Container>
  )
}
