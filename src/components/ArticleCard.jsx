import React from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/article-card.css";
import { truncateText } from "../utils";
import { faRankingStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ArticleCard = ({ article }) => {
  const navigate = useNavigate();
  const truncatedText = article.text ? truncateText(article.text, 50) : null;

  const handleReadArticle = () => {
    navigate(`/articles/${article.id}`);
  };
  return (
    <Card>
      <Card.Header as="h5">{article?.title}</Card.Header>
      {article.imageSrc !== null && (
        <Card.Img
          variant="top"
          src={article.imageSrc}
          className="blog-item-img"
        />
      )}
      <Card.Body className="d-flex flex-column">
        {article.text && <Card.Text>{truncatedText}</Card.Text>}

        <div className="d-flex justify-content-between align-items-center mt-auto">
          <Button variant="primary" onClick={handleReadArticle}>
            Read article
          </Button>
          <div className="d-flex align-items-center">
            {article.rank}
            <FontAwesomeIcon icon={faRankingStar} className="ml-2" />
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ArticleCard;
