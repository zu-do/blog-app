import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
} from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createComment, getComments } from "../utils/comment-axios-utils";
import CommentCard from "./CommentCard";
import { hasCommentPerm } from "../utils/auth-utils";

const CommentsSection = () => {
  const { articleId } = useParams();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    getComments(articleId)
      .then(async (data) => {
        setComments(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      const request = {
        Content: newComment,
      };
      createComment(articleId, request).then((result) => {
        if (result !== null) {
          setComments((prevComments) => [...prevComments, result]);
        }
      });
      setNewComment("");
    }
  };

  const handleCommentDelete = (commentId) => {
    const updatedComments = comments.filter(
      (comment) => comment.id !== commentId
    );
    setComments(updatedComments);
  };

  const handleUpdateComment = (commentId, updatedContent) => {
    const updatedComments = comments.map((c) =>
      c.id === commentId ? { ...c, content: updatedContent } : c
    );
    setComments(updatedComments);
  };

  return (
    <MDBContainer className="mt-5 mb-5" style={{ Width: "100%" }}>
      <MDBRow className="justify-content-center">
        <MDBCol md="12" lg="12">
          <MDBCard
            className="shadow-0 border"
            style={{ backgroundColor: "#f0f2f5" }}
          >
            <MDBCardBody>
              {hasCommentPerm() && (
                <MDBInput
                  wrapperClass="mb-4"
                  placeholder="Type comment and press enter..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyDown={handleKeyPress}
                />
              )}
              {comments
                ?.slice()
                .reverse()
                .map(
                  (comment) =>
                    !comment.isBlocked && (
                      <CommentCard
                        key={comment.id}
                        comment={comment}
                        articleId={articleId}
                        onDelete={handleCommentDelete}
                        onUpdate={handleUpdateComment}
                      />
                    )
                )}
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default CommentsSection;
