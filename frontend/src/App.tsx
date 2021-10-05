import React from "react";
import "./App.css";
import Header from "./Components/Partials/Header/Header";
import Footer from "./Components/Partials/Footer/Footer";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from "./Components/Home/Home";
import Login from "./Components/User/Login/Login";
import Register from "./Components/User/Register/Register";
import Vote from "./Components/Election/Vote/Vote";
import Route404 from "./Components/Partials/Route404/Route404";
import ElectionStats from "./Components/Election/ElectionStats/ElectionStats";
import History from "./Components/Election/History/History";

export default function App(): React.ReactElement {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/vote" component={Vote} />
          <Route path="/history" component={History} />
          <Route path="/election-stats" component={ElectionStats} />
          <Route component={Route404} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}