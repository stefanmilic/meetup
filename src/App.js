import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, NavLink, Route } from "react-router-dom";
import Home from "./components/home";
import Cities from "./components/cities";

const NavBar = () => {
  return (
    <nav>
      <div>Logo</div>
      <ul className="nav-lista">
        <li>
          <NavLink id="link" to="/">
            Home
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <NavBar />

            <Route exact path="/" component={Home} />
            <Route path="/:id" component={Cities} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
