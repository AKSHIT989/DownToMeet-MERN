import React from "react";
import Login from "./pages/Login/index";
import Dashboard from "./pages/Dashboard/index";
import Register from "./pages/Register/index";
import EventsPage from "./pages/EventsPage/index";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import MyRegistrations from "./pages/MyRegistrations";
import TopNav from "./components/NavigationBar/TopNav";
import ViewParticipants from "./pages/ViewParticipants";
import ViewEvent from "./components/DetailedEvents/ViewEvent";
import NotFound from "./components/404";

export default function Routes() {
  return (
    <>
      <TopNav />
      {/* <div style={{paddingTop:"80px"}} /> */}

    <BrowserRouter>
        <Route exact path="/" component={ Dashboard } />
        <Route path="/login" exact component={ Login } />
        <Route path="/register" exact component={ Register } />
        <Route path="/events" exact component={ EventsPage } />
        <Route path="/myregistrations" exact component={ MyRegistrations } />
        <Route path="/event/participants" exact component={ ViewParticipants } />
        <Route path="/eventdetails" exact component={ ViewEvent } />
        {/* <Route path='/*' component={NotFound}/> */}
    </BrowserRouter>
    </>
  );
}
