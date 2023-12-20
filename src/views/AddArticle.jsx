import { useState } from "react";
import { Alert, Button, Col, Form, Image, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/add-article.css";
import { createArticle, getArticles } from "../utils/article-axios-utils";

const initialValues = {
  title: "",
  text: "",
  imageName: "",
  imageSrc: "",
  imageFile: null,
};

const AddArticle = () => {
  const [values, setValues] = useState(initialValues);
  const [error, setError] = useState(null);
  const [forbid, setForbid] = useState(null);
  const navigate = useNavigate();

  const navigateToMain = async () => {
    const updArticles = await updateArticles();
    navigate("/", {
      state: {
        updArticles: updArticles,
      },
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleImageInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      let imageFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        setValues({
          ...values,
          imageFile,
          imageSrc: x.target.result,
        });
      };
      reader.readAsDataURL(imageFile);
    }
  };

  const updateArticles = async () => {
    const articles = await getArticles();
    return articles;
  };

  const validate = () => {
    let isValid = values.title === "" ? false : true;
    setError(!isValid);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("text", values.text);
      formData.append("imageName", values.imageName);
      formData.append("imageFile", values.imageFile);

      const response = createArticle(formData);
      response.then((result) => {
        if (result != null) {
          navigateToMain();
        } else {
          setForbid(true);
        }
      });
    }
  };

  return (
    <div>
      {forbid && (
        <Alert variant="danger">
          You do not have a permission to write articles!
        </Alert>
      )}
      <Row className="justify-content-center align-items-center">
        <Col xs={6} md={4} className="text-center">
          <Image
            src={values.imageSrc}
            alt="No picture selected"
            className="add-article-picture mx-auto d-block"
            fluid
          />
        </Col>
      </Row>

      <Form className="add-article-form" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          {error && <Alert variant="danger">Title is required</Alert>}
          <Form.Label>Title of the article</Form.Label>
          <Form.Control
            type="text"
            placeholder="Title"
            name="title"
            value={values.title}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Text</Form.Label>
          <Form.Control
            name="text"
            as="textarea"
            rows={3}
            value={values.text}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Upload the image</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={handleImageInput}
          />
        </Form.Group>
        <Row className="justify-content-center align-items-center">
          <Button variant="primary" type="submit">
            POST THE ARTICLE
          </Button>
        </Row>
      </Form>
    </div>
  );
};

export default AddArticle;
