import React, { useEffect, useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { updateProfileInfo } from "../utils/user-axios-utils";

const ChangeProfileModal = ({
  show,
  handleClose,
  initialProfile,
  updateProfileData,
}) => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    bio: "",
    ...initialProfile,
  });

  useEffect(() => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      ...initialProfile,
    }));
  }, [initialProfile]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccess(null);

    const request = {
      firstName: e.target.elements.firstName.value,
      lastName: e.target.elements.lastName.value,
      bio: e.target.elements.bio.value,
    };

    const result = await updateProfileInfo(request);

    if (result) {
      setSuccess("Profile information updated successfully");
      updateProfileData();
      setTimeout(() => {
        handleClose();
        setSuccess(null);
      }, 1000);
    } else {
      setError("Profile information update failed:", result.error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        <Modal.Header closeButton>
          <Modal.Title>Change your profile here</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={profile.firstName}
                placeholder="Enter your first name"
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={profile.lastName}
                onChange={handleInputChange}
                placeholder="Enter your last name"
                required
              />
            </Form.Group>

            <Form.Group controlId="formBio">
              <Form.Label>Bio</Form.Label>
              <Form.Control
                as="textarea"
                name="bio"
                value={profile.bio}
                placeholder="Enter your bio"
                rows={3}
                onChange={handleInputChange}
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

export default ChangeProfileModal;
