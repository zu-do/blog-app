import React, { useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { restorePassword } from "../utils/auth-axios-utils";

const RestorePassword = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    setError(null);
    setSuccess(null);

    if (password === confirmPassword) {
      const request = {
        token: token,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      };
      const response = restorePassword(request);
      response.then((result) => {
        if (result != null) {
          setSuccess(
            "Password changed successfully. Please log in with your new password."
          );
        } else {
          console.log("Unexpected error.");
        }
      });
    } else {
      setError("Password and Confirm Password do not match.");
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <div>
            <h2>Password Reset Form</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            {!success && (
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="confirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm your new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Reset Password
                </Button>
              </Form>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default RestorePassword;
