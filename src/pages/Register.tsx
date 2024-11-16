import Heading from "@components/shared/Heading/Heading";
import { Alert, Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import Input from "@components/forms/Input/Input";
import { Link, Navigate } from "react-router-dom";
import useRegister from "@hooks/useRegister";

export default function Register() {
  const {
    register,
    handleSubmit,
    onSubmit,
    error,
    accessToken,
    loading,
    errors
  } = useRegister()
  
  if (accessToken) {
    return <Navigate to="/" />;
  }

  return (
    <Container fluid={"md"}>
      <Heading style="text-center fs-3 my-5">User Registration</Heading>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
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
              disabled={
                loading === "pending"
              }
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
              <span style={{color:"var(--primary)",fontWeight:"300"}}>Already have an account?{" "}</span>
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
            {error && (
              <Alert variant="danger" className="mt-3 px-3 py-2">
                {error}
              </Alert>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
