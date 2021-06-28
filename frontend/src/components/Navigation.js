import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "../App.css";
import axios from "axios";

function Navigation() {
  const [user, setUser] = useState("User");

  useEffect(() => {
    if (localStorage.getItem("user_id") && localStorage.getItem("loggedIn")) {
      //checking logged in state
      axios
        .get("/api/user/" + localStorage.getItem("user_id"))
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
  };

  return (
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
          <NavDropdown
            title={user.username ? "Welcome, " + user.username : "Profile"}
          >
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
  );
}

export default Navigation;
