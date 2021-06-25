import React from "react";
import { useState, useEffect } from "react";
import App from "../App";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import NoEntry from "./NoEntry";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "../App.css";
import axios from "axios";

function Navigation() {
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
        <Navbar
          collapseOnSelect="true"
          bg="dark"
          variant="dark"
          expand="lg"
          sticky="top"
        >
          <Navbar.Brand href="/">MERN-Shop</Navbar.Brand>
          <Navbar.Toggle aria-controls="nav-collapse" />
          <Navbar.Collapse id="nav-collapse">
            <Nav className="ml-auto">
              <Nav.Link href="/">Home</Nav.Link>
              {console.log("USER:", user.username)}
              <NavDropdown title={user.username ? user.username : "Profile"}>
                {user.username ? (
                  <>
                    <NavDropdown.Item
                      as={Link}
                      to={`/dashboard/${user._id}`}
                      key="1"
                    >
                      Profile
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={Link} to="/logout" key="2">
                      Logout
                    </NavDropdown.Item>
                  </>
                ) : (
                  <>
                    <NavDropdown.Item as={Link} to="/login" key="3">
                      Login
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/register" key="4">
                      Register
                    </NavDropdown.Item>
                  </>
                )}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Switch>
          <Route exact path="/">
            <App />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route exact path="/logout">
            {() => handleLogout()}
            <Redirect to="/" />
          </Route>
          {window.localStorage.getItem("loggedIn") &&
          window.localStorage.getItem("user_id") === user._id ? (
            <Route exact path={`/dashboard/:_id`}>
              <Dashboard props={user} />
            </Route>
          ) : (
            <Redirect to="/" />
          )}
          <Route path="*">
            <NoEntry />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default Navigation;
