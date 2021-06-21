import React from "react";
import { useState, useEffect } from "react";
import App from "../App";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";

function Navbar() {
  const [currId, setCurrId] = useState(null);
  const [user, setUser] = useState("User");

  useEffect(() => {
    if (localStorage.getItem("user_id")) {
      setCurrId(localStorage.getItem("user_id"));
      axios
        .get("/user/" + localStorage.getItem("user_id"))
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("user_id");
    setCurrId(null);
  };
  return (
    <Router>
      <div>
        <nav>
          {currId ? (
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to={"/dashboard/" + user._id}>
                  Welcome, {user.username}!
                </Link>
              </li>

              <li>
                <Link to="/" onClick={() => handleLogout()}>
                  Logout
                </Link>
              </li>
            </ul>
          ) : (
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </ul>
          )}

          <div className="current-user"></div>
        </nav>

        <Switch>
          <Route exact path="/">
            <App props={user} />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path={"/dashboard/" + user._id}>
            <Dashboard props={user} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default Navbar;
