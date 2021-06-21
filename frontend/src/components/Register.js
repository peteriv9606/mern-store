import React, { useState } from "react";
import axios from "axios";

export default function Register() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [response, setResponse] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/register", user)
      .then((res) => {
        if (res) {
          console.log(res);
          setResponse(res);
          if (res.status === 201) {
            //remove input and display success message
            setUser({
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
    <div className="register-page">
      <h1 style={{ textAlign: "center" }}>Register Page</h1>
      {/*       {response && response.status != 201 ?
      
      :
      ({response && (
        <p>
          Status:{response.status}/{response.data}
        </p>
      )}) */}
      {console.log(response)}
      {response.status !== 201 ? (
        <form style={{ textAlign: "center" }}>
          <div className="form-group">
            <label htmlFor="username" />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>
          <input
            type="submit"
            value="Create User"
            onClick={(e) => handleFormSubmit(e)}
          />
          {response && (
            <p>
              Status:{response.status}/{response.data}
            </p>
          )}
        </form>
      ) : (
        response && (
          <div style={{ textAlign: "center" }}>
            <h1>{response.data}</h1>
            <p>Please wait while we redirect you to the login screen...</p>
          </div>
        )
      )}
    </div>
  );
}
