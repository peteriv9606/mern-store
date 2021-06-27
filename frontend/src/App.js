import "./App.css";
import Home from "./components/Home";
import ProductDetails from "./components/ProductDetails";
import Navigation from "./components/Navigation";
import Login from "./components/Login";
import Register from "./components/Register";
import NoEntry from "./components/NoEntry";
import Dashboard from "./components/Dashboard";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <div className="content-wrapper">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/products/:_id">
              <ProductDetails />
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
                  <Dashboard />
                </Route>
              </>
            ) : (
              <Redirect to="/" />
            )}
            <Route path="*">
              <NoEntry />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
