import {
  faPenToSquare,
  faTrash,
  faPlus,
  faMinus,
  faRankingStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Alert, Card } from "react-bootstrap";
import { ButtonGroup, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import EditArticleModal from "../components/EditArticleModal";
import { RANK_PERM, WRITE_PERM } from "../constants";
import {
  deleteArticle,
  downvoteArticle,
  getArticle,
  getArticles,
  upvoteArticle,
} from "../utils/article-axios-utils";
import CommentsSection from "../components/CommentsSection";
import { MDBContainer } from "mdb-react-ui-kit";
import { checkEditDeletePerm } from "../utils/auth-utils";

const ArticleDetail = () => {
  const { articleId } = useParams();
  const [article, setArticle] = useState();
  const [forbid, setForbid] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const navigate = useNavigate();
  const handleEditModalOpen = () => {
    setShowEditModal(true);
  };

  const navigateToMain = async () => {
    const updArticles = await getArticles();
    navigate("/", {
      state: {
        updArticles: updArticles,
      },
    });
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
  };

  useEffect(() => {
    getArticle(articleId)
      .then(async (data) => {
        setArticle(data);
      })
      .catch((err) => console.log(err));
  }, [articleId]);

  if (!article) {
    return <div>Loading...</div>;
  }

  const initialArticle = {
    id: article?.id,
    title: article?.title,
    text: article?.text,
  };

  const handleUpdateArticle = async () => {
    const updateArticleData = await getArticle(articleId);
    setArticle(updateArticleData);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      const response = deleteArticle(articleId);
      response.then((result) => {
        if (result != null) {
          navigateToMain();
        } else {
          setForbid(true);
        }
      });
    }
  };

  const handleUpvote = () => {
    const response = upvoteArticle(articleId);
    response.then((result) => {
      if (result != null) {
        window.alert("Article ranked.");
        setArticle((prevArticle) => ({
          ...prevArticle,
          rank: result,
        }));
      } else {
        window.alert("You have already ranked this article.");
      }
    });
  };

  const handleDownVote = () => {
    const response = downvoteArticle(articleId);
    response.then((result) => {
      if (result != null) {
        window.alert("Article ranked.");
        setArticle((prevArticle) => ({
          ...prevArticle,
          rank: result,
        }));
      } else {
        window.alert("You have already ranked this article.");
      }
    });
  };

  return (
    <MDBContainer className="mt-5">
      <Card style={{ width: "100%" }}>
        {forbid && (
          <Alert variant="danger">
            You do not have a permission to delete articles!
          </Alert>
        )}
        <Card.Header
          as="h4"
          className="d-flex justify-content-between align-items-center"
        >
          {article.title}
          {checkEditDeletePerm(article.authorId) && (
            <div>
              <FontAwesomeIcon
                icon={faPenToSquare}
                style={{ color: "#3f4d64", marginRight: "5px" }}
                onClick={handleEditModalOpen}
              />
              <FontAwesomeIcon icon={faTrash} onClick={handleDelete} />
            </div>
          )}
        </Card.Header>
        {article.imageSrc !== null && (
          <Card.Img
            variant="top"
            src={article.imageSrc}
            style={{
              maxHeight: "300px",
              maxWidth: "80%",
              objectFit: "cover",
              margin: "auto",
              display: "block",
            }}
          />
        )}
        <Card.Body>
          <Card.Text>{article.text}</Card.Text>

          <div className="d-flex justify-content-between">
            <div>
              <FontAwesomeIcon icon={faRankingStar} /> {article.rank}
              {sessionStorage.getItem(RANK_PERM) === "true" && (
                <ButtonGroup>
                  <Button variant="light" onClick={handleUpvote}>
                    <FontAwesomeIcon icon={faPlus} />
                  </Button>
                  <Button variant="light" onClick={handleDownVote}>
                    <FontAwesomeIcon icon={faMinus} />
                  </Button>
                </ButtonGroup>
              )}
            </div>
            by {article?.authorUsername}
          </div>
        </Card.Body>
      </Card>
      <CommentsSection></CommentsSection>
      <EditArticleModal
        show={showEditModal}
        handleClose={handleEditModalClose}
        initialArticle={initialArticle}
        updateArticleData={() => handleUpdateArticle()}
      />
    </MDBContainer>
  );
};

export default ArticleDetail;
