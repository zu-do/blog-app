import { MDBCard, MDBCardBody, MDBCardImage, MDBIcon } from "mdb-react-ui-kit";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { checkToken, hasCommentPerm } from "../utils/auth-utils";
import {
  blockComment,
  deleteComment,
  editComment,
  reportComment,
} from "../utils/comment-axios-utils";
import { getFormatedDate } from "../utils/comment-utils";

const CommentCard = ({ comment, articleId, onDelete, onUpdate }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const handleDelete = () => {
    deleteComment(articleId, comment.id).then((result) => {
      if (result !== null) {
        onDelete(comment.id);
      }
    });
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleReportClick = () => {
    reportComment(articleId, comment.id).then((result) => {
      if (result != null) {
        window.alert("Reported!");
      } else {
        window.alert("You already reported this comment.");
      }
    });
  };

  const handleSaveEdit = () => {
    onUpdate(comment.id, editedContent);
    const request = {
      Content: editedContent,
    };
    editComment(articleId, comment.id, request).then((result) => {
      if (result !== null) {
        setEditMode(false);
      }
    });
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditedContent(comment.content);
  };

  return (
    <MDBCard className="mb-4">
      <MDBCardBody>
        {editMode ? (
          <div className="mb-2">
            <input
              style={{ width: "85%" }}
              type="text"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <button
              className="btn btn-outline-primary mx-2"
              onClick={handleSaveEdit}
            >
              Save
            </button>
            <button
              className="btn btn-outline-secondary"
              onClick={handleCancelEdit}
            >
              Cancel
            </button>
          </div>
        ) : (
          <div>
            <p>
              {comment.content}
              {checkToken() && (
                <Button
                  variant="link"
                  className="float-right"
                  size="sm"
                  onClick={handleReportClick}
                >
                  Report
                </Button>
              )}
            </p>
            <div className="d-flex justify-content-between">
              <div className="d-flex flex-row align-items-center">
                <MDBCardImage
                  src="https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png"
                  alt="avatar"
                  width="25"
                  height="25"
                />
                <p className="small mb-0 ms-2">{comment.authorUserName}</p>
                <p className="small mb-0 ms-2">
                  {getFormatedDate(comment.createdAt)}
                </p>
              </div>
              {hasCommentPerm() && (
                <div className="d-flex justify-content-between align-items-center">
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={handleDelete}
                  >
                    Delete
                  </Button>
                  <MDBIcon
                    far
                    icon="thumbs-up mx-2 fa-xs text-black"
                    style={{ marginTop: "-0.16rem" }}
                  />
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={handleEdit}
                  >
                    Edit
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </MDBCardBody>
    </MDBCard>
  );
};

export default CommentCard;
