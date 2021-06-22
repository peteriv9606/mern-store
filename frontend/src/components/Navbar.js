import React from "react";
import { useState, useEffect } from "react";
import App from "../App";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import NoEntry from "./NoEntry";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";

function Navbar() {
  const [currId, setCurrId] = useState(null);
  const [user, setUser] = useState("User");

  useEffect(() => {
    if (localStorage.getItem("user_id")) {
      console.log("Logged in:", localStorage.getItem("user_id"));
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
    localStorage.removeItem("loggedIn");
    setCurrId(null);
  };
  const checkLoggedStatus = () => {
    alert(window.location.pathname);
    if (
      localStorage.getItem("user_id") &&
      localStorage.getItem("loggedIn") === true
    ) {
      alert("Not found");
    } else window.location.replace(window.location.origin);
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
          <Route
            exact
            path={"/dashboard/" + user._id}
            children={<Dashboard props={user} />}
          ></Route>
          <Route path="*">
            <NoEntry />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default Navbar;
