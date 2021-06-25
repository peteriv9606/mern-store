import axios from "axios";
import React, { useState } from "react";
import { Button, Spinner, Form } from "react-bootstrap";

export default function Register() {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/register", input)
      .then(setIsLoading(true))
      .then((res) => {
        if (res) {
          setIsLoading(false);
          setResponse(res);
          console.log(res);
          if (res.status === 201) {
            //remove input and display success message
            setInput({
              username: "",
              password: "",
            });
            setTimeout(() => {
              window.location.replace("/login");
            }, 4000);
          }
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="sign-form-wrapper">
      <Form>
        <h1 className="text-center">Register</h1>
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
            value={input.password}
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
              "Register"
            )}
          </Button>
          {response !== "" &&
            (response.status === 200 ? (
              <p className="text-danger p-0 m-0">{response.data}</p>
            ) : (
              <p className="text-success p-0 m-0">
                {response.data}
                <br />
                Redirecting to Login Screen..
              </p>
            ))}
        </Form.Group>
      </Form>
    </div>
  );
}
