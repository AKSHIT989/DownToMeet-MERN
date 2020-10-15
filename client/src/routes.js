import React from "react";
import Login from "./pages/Login/index";
import Dashboard from "./pages/Dashboard/index";
import Register from "./pages/Register/index";
import EventsPage from "./pages/EventsPage/index";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import MyRegistrations from "./pages/MyRegistrations";
import TopNav from "./components/TopNav";
import ViewParticipants from "./pages/ViewParticipants";

export default function Routes() {
  return (
    <BrowserRouter>
      <TopNav />
      <Switch>
        <Route exact path="/" component={ Dashboard } />
        <Route path="/myregistrations" exact component={ MyRegistrations } />
        <Route path="/event/participants" exact component={ ViewParticipants } />
        <Route path="/login" exact component={ Login } />
        <Route path="/register" exact component={ Register } />
        <Route path="/events" component={ EventsPage } />
      </Switch>
    </BrowserRouter>
  );
}
