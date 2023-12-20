import React, { useEffect, useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { updateArticle } from "../utils/article-axios-utils";

const EditArticleModal = ({
  show,
  handleClose,
  initialArticle,
  updateArticleData,
}) => {
  const [article, setArticle] = useState({
    id: "",
    title: "",
    text: "",
    ...initialArticle,
  });
  const [error, setError] = useState(null);
  const [forbid, setForbid] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    setArticle((prevArticle) => ({
      ...prevArticle,
      ...initialArticle,
    }));
  }, [initialArticle]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(null);
    setForbid(null);

    const request = {
      title: e.target.elements.title.value,
      text: e.target.elements.text.value,
    };

    const response = updateArticle(article.id, request);
    response.then((result) => {
      if (result != null) {
        setSuccess("Article information updated successfully");
        updateArticleData();
        setTimeout(() => {
          handleClose();
          setSuccess(null);
        }, 1000);
      } else {
        setForbid(true);
        setError("Article information update failed.");
      }
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setArticle((prevArticle) => ({
      ...prevArticle,
      [name]: value,
    }));
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        {forbid && (
          <Alert variant="danger">
            You do not have a permission to edit articles!
          </Alert>
        )}
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        <Modal.Header closeButton>
          <Modal.Title>Change the artical info here</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formTitle">
              <Form.Label>TITLE</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={article?.title}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formText">
              <Form.Label>TEXT</Form.Label>
              <Form.Control
                as="textarea"
                name="text"
                value={article.text ? article.text : ""}
                placeholder="Enter your text"
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

export default EditArticleModal;
