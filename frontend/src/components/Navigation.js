import React from "react";
import { useState, useEffect } from "react";
import App from "../App";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import NoEntry from "./NoEntry";
import Product from "./Product";
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
  const [user, setUser] = useState("User");

  useEffect(() => {
    if (localStorage.getItem("user_id")) {
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

    setUser("User");
    console.log("Should be logged out");
  };

  return (
    <Router>
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
                  <NavDropdown.Item
                    as={Link}
                    to="/logout"
                    key="2"
                    onClick={() => handleLogout()}
                  >
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
        <Route path="/product/:_id">
          <Product />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/logout">
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
    </Router>
  );
}

export default Navigation;
