import React from "react";
import Login from "./pages/Login/index";
import Dashboard from "./pages/Dashboard/index";
import Register from "./pages/Register/index";
import EventsPage from "./pages/EventsPage/index";
import { BrowserRouter, Switch, Route } from "react-router-dom";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/events" component={EventsPage} />
      </Switch>
    </BrowserRouter>
  );
}
