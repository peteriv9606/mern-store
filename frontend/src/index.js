import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import Navigation from "./components/Navigation";
import Home from "./components/Home";
import ProductDetails from "./components/ProductDetails";
import Login from "./components/Login";
import Register from "./components/Register";
import NoEntry from "./components/NoEntry";
import Dashboard from "./components/Dashboard";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <div className="App">
        <Navigation />
        <div className="content-wrapper">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/products/:_id">
              <ProductDetails />
            </Route>
            <Route exact path="/products/">
              <Redirect to="/" />
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
            {window.localStorage.getItem("loggedIn") ? (
              <>
                <Route exact path="/dashboard">
                  {localStorage.getItem("user_id") ? (
                    <Redirect
                      to={`/dashboard/${localStorage.getItem("user_id")}`}
                    />
                  ) : (
                    <NoEntry />
                  )}
                </Route>
                <Route exact path={`/dashboard/:_id`}>
                  {localStorage.getItem("user_id") && (
                    <Redirect
                      to={`/dashboard/${localStorage.getItem("user_id")}`}
                    />
                  )}
                  <Dashboard />
                </Route>
              </>
            ) : (
              <Redirect to="/" />
            )}
            <Route>
              {console.log("RENDER <NoEntry /> COMPONENT")}
              <NoEntry />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
