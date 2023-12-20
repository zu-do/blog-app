import React, { useEffect, useState } from "react";
import { Dropdown, Table } from "react-bootstrap";
import {
  changeCommentPermission,
  changeRankPermission,
  changeWritePermission,
} from "../utils/admin-axios-utils";
import { getUsers } from "../utils/auth-axios-utils";

const Admin = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers()
      .then(async (data) => {
        setUsers(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleWritePermChange = (userId, value) => {
    const booleanValue = value === "true";
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, canWriteArticles: booleanValue } : user
      )
    );
    const request = {
      Id: userId,
      Value: booleanValue,
    };
    const response = changeWritePermission(request);
    response.then((result) => {
      if (result) {
        window.alert("Permission changed!");
      }
    });
  };

  const handleRankPermChange = (userId, value) => {
    const booleanValue = value === "true";
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, canRankArticles: booleanValue } : user
      )
    );
    const request = {
      Id: userId,
      Value: booleanValue,
    };
    const response = changeRankPermission(request);
    response.then((result) => {
      if (result) {
        window.alert("Permission changed!");
      }
    });
  };

  const handleCommentPermChange = (userId, value) => {
    const booleanValue = value === "true";
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, canWriteComments: booleanValue } : user
      )
    );
    const request = {
      Id: userId,
      Value: booleanValue,
    };
    const response = changeCommentPermission(request);
    response.then((result) => {
      if (result) {
        window.alert("Permission changed!");
      }
    });
  };

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>User Email</th>
            <th>User Name</th>
            <th>Write</th>
            <th>Rank</th>
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user.id}>
              <td>{user.email}</td>
              <td>{user.userName}</td>
              <td>
                <Dropdown
                  onSelect={(value) => handleWritePermChange(user.id, value)}
                >
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {user.canWriteArticles ? "Granted" : "Not Granted"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item eventKey="true">Granted</Dropdown.Item>
                    <Dropdown.Item eventKey="false">Not Granted</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </td>

              <td>
                <Dropdown
                  onSelect={(value) => handleRankPermChange(user.id, value)}
                >
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {user.canRankArticles ? "Granted" : "Not Granted"}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item eventKey="true">Granted</Dropdown.Item>
                    <Dropdown.Item eventKey="false">Not Granted</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </td>

              <td>
                <Dropdown
                  onSelect={(value) => handleCommentPermChange(user.id, value)}
                >
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {user.canWriteComments ? "Granted" : "Not Granted"}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item eventKey="true">Granted</Dropdown.Item>
                    <Dropdown.Item eventKey="false">Not Granted</Dropdown.Item>
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

export default Admin;
