"use client";
import React, { useState } from "react";
import { Button, Card, Container, Form, Stack } from "react-bootstrap";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const [email, setEamil] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (res.error === null) {
      router.push("/");
    } else {
      setIsLoading(false);
      toast.error(res.error);
    }
  };

  const handleGoogle = async (e) => {
    e.preventDefault();
    await signIn("google", { callbackUrl: "/" });
  };
  return (
    <>
      <Container>
        <Card>
          <Card.Header>
            <h5 className="text-center">Login</h5>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Stack gap={3}>
                <Form.Group>
                  <Form.Label htmlFor="email">Email: </Form.Label>
                  <Form.Control
                    id="email"
                    type="text"
                    placeholder="Eamil"
                    value={email}
                    onChange={(e) => setEamil(e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label htmlFor="password">Password: </Form.Label>
                  <Form.Control
                    id="password"
                    type="text"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <div>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Logging in" : "Login"}
                  </Button>
                  <span className="ms-3">
                    Do not have an account?{" "}
                    <Link href={"/auth/register"}>Create Account!</Link>
                  </span>
                </div>
              </Stack>
            </Form>
            <hr />
            <div>
              <p className="text-center">OR</p>
              <div>
                <Button onClick={handleGoogle} variant="outline-dark">
                  <FcGoogle size={20} /> SignIn With Google
                </Button>
              </div>
            </div>
          </Card.Body>
        </Card>
        <ToastContainer position="top-center" />
      </Container>
    </>
  );
};

export default Login;
