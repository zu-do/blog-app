import React, { useEffect, useState } from "react";
import { Dropdown, Table, Nav } from "react-bootstrap";
import { getReportedComments } from "../utils/admin-axios-utils";
import { blockComment } from "../utils/comment-axios-utils";
import { getFormatedDate } from "../utils/comment-utils";
import { useNavigate } from "react-router-dom";

const AdminReports = () => {
  const [reportedComments, setReportedComments] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getReportedComments()
      .then(async (data) => {
        setReportedComments(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const navigateToArticle = (articleId) => {
    navigate(`/articles/${articleId}`);
  };

  const handleBlockStatusChange = (commentId, value) => {
    const booleanValue = value === "true";
    const selectedComment = reportedComments.find(
      (comment) => comment.id === commentId
    );
    const request = {
      isBlocked: booleanValue,
    };
    const response = blockComment(
      selectedComment.articleId,
      commentId,
      request
    );
    response.then((result) => {
      if (result) {
        setReportedComments((prevReportedComments) =>
          prevReportedComments.map((comment) =>
            comment.id === commentId
              ? { ...comment, isBlocked: booleanValue }
              : comment
          )
        );
        window.alert("Block status changed!");
      }
    });
  };

  return (
    <div>
      <Table striped bordered hover size="sm" className="main-wrap w-100">
        <thead>
          <tr>
            <th>Comment author</th>
            <th>Comment's content</th>
            <th>Comment created at</th>
            <th>Count of reports</th>
            <th>Article</th>
            <th>Block</th>
          </tr>
        </thead>
        <tbody>
          {reportedComments?.map((comment) => (
            <tr key={comment.id}>
              <td>{comment.authorUserName}</td>
              <td>{comment.content}</td>
              <td>{getFormatedDate(comment.createdAt)}</td>
              <td>{comment.reportCount}</td>
              <td>
                <Nav.Item>
                  <Nav.Link
                    eventKey="link-2"
                    onClick={() => navigateToArticle(comment.articleId)}
                    style={{ color: "blue", textDecoration: "underline" }}
                  >
                    Read the article
                  </Nav.Link>
                </Nav.Item>
              </td>
              <td>
                <Dropdown
                  onSelect={(value) =>
                    handleBlockStatusChange(comment.id, value)
                  }
                >
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {comment.isBlocked ? "Blocked" : "Not Blocked"}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item eventKey="true">Blocked</Dropdown.Item>
                    <Dropdown.Item eventKey="false">Not Blocked</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminReports;
