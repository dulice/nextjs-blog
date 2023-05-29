"use client"
import React from "react";
import { Modal, Spinner } from "react-bootstrap";

const Loading = () => {
  return (
    <Modal centered show={true}>
      <Modal.Body>
        <Spinner animation="border" variant="primary" />
      </Modal.Body>
    </Modal>
  );
};

export default Loading;
