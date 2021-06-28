import axios from "axios";
import React, { useState } from "react";
import { Button, Spinner, Form } from "react-bootstrap";

export default function Login() {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/login", input)
      .then(setIsLoading(true))
      .then((res) => {
        setIsLoading(false);
        setResponse(res);
        if (res.data._id) {
          localStorage.setItem("user_id", res.data._id);
          localStorage.setItem("loggedIn", true);
          window.location.replace("/");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="sign-form-wrapper">
      <Form>
        <h1 className="text-center">Login</h1>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            value={input.username}
            onClick={() => setResponse("")}
            onChange={(e) => {
              setInput({ ...input, username: e.target.value });
            }}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onClick={() => setResponse("")}
            onChange={(e) => {
              setInput({ ...input, password: e.target.value });
            }}
          />
        </Form.Group>
        <Form.Group
          controlId="form-footer"
          className="d-flex flex-wrap justify-content-between"
        >
          <Button
            onClick={(e) => handleFormSubmit(e)}
            className="btn btn-success"
          >
            {isLoading ? (
              <Spinner animation="border" role="status" size="sm">
                <span className="sr-only">Loading...</span>
              </Spinner>
            ) : (
              "Login"
            )}
          </Button>
          <p className="text-danger p-0 m-0">
            {response.data && !response.data._id && response.data}
          </p>
        </Form.Group>
      </Form>
    </div>
  );
}
