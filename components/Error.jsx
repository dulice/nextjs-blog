import React from "react";
import { Alert, Container } from "react-bootstrap";

const Error = () => {
  return (
    <Container className="px-5">
      <Alert variant="danger">Failed to load the data.</Alert>
    </Container>
  );
};

export default Error;
