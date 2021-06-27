import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Spinner, Form } from "react-bootstrap";

export default function Register() {
  const [input, setInput] = useState({
    fullName: "",
    username: "",
    password: "",
    confPassword: "",
    email: "",
    registrationDate: "",
  });
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isValidForm, setIsValidForm] = useState({
    state: false,
    message: "",
  });
  useEffect(() => {
    console.log("useEffect run");
    if (isValidForm.state) {
      console.log("FORM IS VALID");
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
                fullName: "",
                username: "",
                password: "",
                confPassword: "",
                email: "",
                registrationDate: "",
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
    }
  }, [isValidForm.state]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    var requiredFields = document
      .getElementById("reg-form")
      .querySelectorAll("[required]");
    requiredFields.forEach((field) => {
      if (field.value === "") {
        //check if field is empty - if empty - display err message + return 0
        setIsValidForm({
          state: false,
          message: "Fields marked with * are required",
        });
        return 0;
      } else if (requiredFields[1].value && requiredFields[2].value) {
        //field is not empty, check if password fields are both filled
        if (requiredFields[1].value !== requiredFields[2].value) {
          //if password fields do not match - display error message
          setIsValidForm({ state: false, message: "Passwords do not match" });
          return 0;
        } else if (requiredFields[1].value.length < 6) {
          //if password fields match, but length is less than 6 chars display error message
          setIsValidForm({
            state: false,
            message: "Password must be at least 6 characters long",
          });
          return 0;
        }
      } else {
        setIsValidForm({ state: false, message: "Password field missing" });
        return 0;
      }
      if (
        //field is not empty, check if email is entered and is in correct format
        requiredFields[3].value &&
        !/^.+\@.+\..+$/.test(requiredFields[3].value)
      ) {
        setIsValidForm({
          state: false,
          message: "Empty or invalid email address",
        });
        return 0;
      } else {
        delete input.confPassword;
        const dateNow = new Date();
        setInput({ ...input, registrationDate: dateNow.toUTCString() });
        setIsValidForm({ state: true, message: "OK" });
      }
    });
  };

  return (
    <div className="sign-form-wrapper">
      <Form id="reg-form">
        <h1 className="text-center">Register</h1>
        <Form.Group controlId="fullName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="eg. John Doe"
            value={input.fullName}
            onClick={() => {
              setResponse("");
              setIsValidForm({ state: false, message: "" });
            }}
            onChange={(e) => {
              setInput({ ...input, fullName: e.target.value });
            }}
          />
        </Form.Group>
        <Form.Group controlId="username">
          <Form.Label>
            Username<span className="required">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            required
            value={input.username}
            onClick={() => {
              setResponse("");
              setIsValidForm({ state: false, message: "" });
            }}
            onChange={(e) => {
              setInput({ ...input, username: e.target.value });
            }}
          />
        </Form.Group>
        <div className="d-flex m-0">
          <Form.Group controlId="password" className="w-50 mr-1">
            <Form.Label>
              Password<span className="required">*</span>
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              required
              minLength="6"
              onClick={() => {
                setResponse("");
                setIsValidForm({ state: false, message: "" });
              }}
              value={input.password}
              onChange={(e) => {
                setInput({ ...input, password: e.target.value });
              }}
            />
          </Form.Group>
          <Form.Group controlId="confPassword" className="w-50 ml-1">
            <Form.Label>
              Repeat Password<span className="required">*</span>
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              required
              minLength="6"
              onClick={() => {
                setResponse("");
                setIsValidForm({ state: false, message: "" });
              }}
              value={input.confPassword}
              onChange={(e) => {
                setInput({ ...input, confPassword: e.target.value });
              }}
            />
          </Form.Group>
        </div>

        <Form.Group controlId="email">
          <Form.Label>
            Email<span className="required">*</span>
          </Form.Label>
          <Form.Control
            type="email"
            placeholder="eg. JohnDoe@mail.com"
            value={input.email}
            required
            onClick={() => {
              setResponse("");
              setIsValidForm({ state: false, message: "" });
            }}
            onChange={(e) => {
              setInput({ ...input, email: e.target.value });
            }}
          />
        </Form.Group>
        <Form.Group
          controlId="form-footer"
          className="d-flex flex-wrap justify-content-between"
        >
          <Form.Label className="w-100">
            Fields marked with * are required
          </Form.Label>
          <Button
            onClick={(e) => handleFormSubmit(e)}
            className="btn btn-success"
            type="submit"
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
          {isValidForm.state !== true && (
            <p className="text-danger p-0 m-0">{isValidForm.message}</p>
          )}
        </Form.Group>
      </Form>
    </div>
  );
}
