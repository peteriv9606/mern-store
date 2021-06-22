import axios from "axios";
import React, { useState } from "react";

export default function Login() {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const [response, setResponse] = useState("");
  const handleFormSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/login", input)
      .then((res) => {
        setResponse(res);
        console.log(res);
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
  const handleOnFocus = () => {
    if (response) setResponse("");
  };
  return (
    <div>
      <form style={{ textAlign: "center" }}>
        <h1>Login</h1>
        <div className="form-group">
          <label htmlFor="username" />
          <input
            type="text"
            name="username"
            value={input.username}
            placeholder="Username"
            onChange={(e) => {
              setInput({ ...input, username: e.target.value });
              handleOnFocus();
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={input.password}
            onChange={(e) => {
              setInput({ ...input, password: e.target.value });
              handleOnFocus();
            }}
          />
        </div>
        <input
          type="submit"
          value="Log in"
          onClick={(e) => handleFormSubmit(e)}
        />
        {response.data && !response.data._id && (
          <p style={{ color: "red" }}>{response.data}</p>
        )}
      </form>
    </div>
  );
}
