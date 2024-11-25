import Heading from "@components/shared/Heading/Heading";
import {
  Button,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import Input from "@components/forms/Input/Input";
import { Link, Navigate } from "react-router-dom";
import useRegister from "@hooks/useRegister";
import { LottieHandler } from "@components/feedback";
import { useEffect } from "react";

export default function Register() {
  const {
    register,
    handleSubmit,
    onSubmit,
    accessToken,
    loading,
    errors,
  } = useRegister();

  // Scroll to top when component is mounted
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (accessToken) {
    return <Navigate to="/" />;
  }

  return (
    <Container fluid={"md"}>
      <div className="mt-5 d-flex flex-column justify-content-center">
        <Row>
          <Col >
            <Heading style="text-center fs-3 mb-4 my-md-5">User Registration</Heading>
            <div className="w-75   mx-auto">
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Input
                label="Username"
                register={register}
                name="userName"
                error={errors.userName?.message}
              />

              <Input
                label="Email"
                register={register}
                name="email"
                error={errors.email?.message}
              />

              <Input
                label="Password"
                register={register}
                name="password"
                type="password"
                error={errors.password?.message}
              />

              <Input
                label="Confirm Password"
                register={register}
                name="confirmPassword"
                type="password"
                error={errors.confirmPassword?.message}
              />

              <div className="text-end">
                <Button
                  variant="primary"
                  type="submit"
                  disabled={loading === "pending"}
                >
                  {loading === "pending" ? (
                    <>
                      <Spinner animation="border" size="sm" /> Loading...
                    </>
                  ) : (
                    "Register"
                  )}
                </Button>
              </div>
              <p className="my-4 text-center ">
                <span style={{ color: "var(--primary)", fontWeight: "300" }}>
                  Already have an account?{" "}
                </span>
                <Link
                  to={"/login"}
                  style={{
                    fontWeight: "600",
                    textDecoration: "none",
                    color: "var(--primary)",
                  }}
                >
                  Login
                </Link>
              </p>
              
            </Form>
            </div>
          </Col>
          <Col className=" mt-5 d-none d-lg-flex  pt-5 justify-content-center align-content-center">
            <LottieHandler type="register" />
          </Col>
        </Row>
      </div>
    </Container>
  );
}
