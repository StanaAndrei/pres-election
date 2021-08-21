import React from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from "./Routes/Home/Home";
import Login from "./Routes/Login/Login";
import Register from "./Routes/Register/Register";
import Route404 from "./Routes/Route404/Route404";
import Vote from "./Routes/Vote/Vote";


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
          <Route component={Route404} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}