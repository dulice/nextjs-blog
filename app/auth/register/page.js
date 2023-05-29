"use client";
import React, { useState } from "react";
import { Button, Card, Container, Form, Stack } from "react-bootstrap";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";

const Register = () => {
  const [name, setname] = useState("");
  const [email, setEamil] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
      toast.error(err);
    }
  };
  return (
    <>
      <Container>
        <Card>
          <Card.Header>
            <h5 className="text-center">Register</h5>
          </Card.Header>
          <Card.Body>
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
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Registering" : "Register"}
                  </Button>
                  <span className="ms-3">
                    Already have an account?{" "}
                    <Link href={"/auth/login"}>Login Account!</Link>
                  </span>
                </div>
              </Stack>
            </Form>
          </Card.Body>
        </Card>
        <ToastContainer position="top-center"/>
      </Container>
    </>
  );
};

export default Register;
