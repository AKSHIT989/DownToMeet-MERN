import React from "react";
import Login from "./pages/Login/index";
import Dashboard from "./pages/Dashboard/index";
import Register from "./pages/Register/index";
import { BrowserRouter, Switch, Route } from "react-router-dom";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/dashboard" component={Dashboard} />
      </Switch>
    </BrowserRouter>
  );
}
