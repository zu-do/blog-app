import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { forgotPasswordRequest } from "../utils/auth-axios-utils";

const ForgotPasswordModal = ({ show, handleClose }) => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    const response = forgotPasswordRequest(e.target.elements.email.value);
    response.then((result) => {
      if (result) {
        handleClose();
      } else {
        setErrorMessage("There is no user with provided email.");
      }
    });
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Restore your password here</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}
          <Form onSubmit={handleForgotPasswordSubmit}>
            <Form.Group controlId="formOldPassword">
              <Form.Label>Please enter your email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter your email"
                required
              />
            </Form.Group>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Send a link
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ForgotPasswordModal;
