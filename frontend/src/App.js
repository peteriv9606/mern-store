import { useState, useEffect } from "react";
import "./App.css";
function App() {
  const axios = require("axios").default;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const data = {
    username: username,
    password: password,
  };
  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    //set login status
    if (localStorage.getItem("auth_token")) {
      setLoggedIn(true);
    }
  }, []);
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("TESTING:", window.location);
    console.log("Submitting form...", data);
    axios
      .post("/users", data)
      .then((response) => {
        console.log(
          "Getting server response (token)",
          response.data.auth_token
        );
        if (localStorage.getItem("auth_token")) {
          //logged in
          localStorage.removeItem("auth_token");
          setLoggedIn(false);
        } else {
          localStorage.setItem("auth_token", response.data.auth_token);
          setLoggedIn(true);
        }
      })
      .catch((error) => console.log("ERROR:", error));
  };

  return (
    <div className="App">
      <header className="App-header">
        <form>
          <label htmlFor="username" />
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          ></input>
          <input
            type="submit"
            value="Submit"
            onClick={(e) => handleFormSubmit(e)}
          />
        </form>

        <p>Logged in: {loggedIn ? "YES" : "NO"}</p>
      </header>
    </div>
  );
}

export default App;
