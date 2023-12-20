import React, { useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { changePassword } from "../utils/user-axios-utils";

const ChangePasswordModal = ({ show, handleClose }) => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const oldPassword = e.target.elements.oldPassword.value;
    const newPassword = e.target.elements.newPassword.value;
    const request = {
      Password: newPassword,
      OldPassword: oldPassword,
    };
    const response = changePassword(request);
    response.then((result) => {
      if (result != null) {
        setSuccess("Succesfully change.");
        setTimeout(() => {
          handleClose();
          setSuccess(null);
        }, 1000);
      } else {
        setError("Something went wrong. Try again.");
        setTimeout(() => {
          setError(null);
        }, 1000);
      }
    });
    handleClose();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        <Modal.Header closeButton>
          <Modal.Title>Change your password here</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formOldPassword">
              <Form.Label>Old Password</Form.Label>
              <Form.Control
                type="password"
                name="oldPassword"
                placeholder="Enter old password"
                required
              />
            </Form.Group>

            <Form.Group controlId="formNewPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                name="newPassword"
                placeholder="Enter new password"
                required
              />
            </Form.Group>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ChangePasswordModal;
