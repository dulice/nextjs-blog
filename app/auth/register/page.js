"use client";
import React, { useState } from "react";
import { Alert, Button, Card, Container, Form, Stack } from "react-bootstrap";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Register = () => {
  const [name, setname] = useState("");
  const [email, setEamil] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post("/api/register", { name, email, password });
      setIsLoading(false);
      router.push("/auth/login");
    } catch (err) {
      setIsLoading(false);
      setErrorMessage(err);
    }
  };
  return (
    <>
      <Container style={{ marginTop: "5rem" }}>
        <Card>
          <Card.Header>
            <h5 className="text-center">Register</h5>
          </Card.Header>
          <Card.Body>
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Stack gap={3}>
                <Form.Group>
                  <Form.Label htmlFor="name">name: </Form.Label>
                  <Form.Control
                    id="name"
                    type="text"
                    placeholder="name"
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                  />
                </Form.Group>
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
                  <div className="d-flex justify-content-center">
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? "Registering" : "Register"}
                    </Button>
                  </div>
                  <small className="text-center d-block mt-2">
                    Already have an account?{" "}
                    <Link href={"/auth/login"}>Login Account!</Link>
                  </small>
                </div>
              </Stack>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Register;
