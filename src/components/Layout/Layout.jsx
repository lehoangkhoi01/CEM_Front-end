import React, { useState } from "react";
import Header from "../Header/Header";
import Club from "../../pages/Club/Club";
import Events from "../../pages/Events/Events";
import Slidebar from "../Slidebar/Slidebar";
import { Route, Switch } from "react-router";
import CssBaseline from "@material-ui/core/CssBaseline";
import EventPost from "../../pages/EventPosts/EventPost";
import NotFound from "../NotFound";
import ClubDetail from "../../pages/ClubDetail/ClubDetail";
import EventDetail from "../../pages/EventDetail/EventDetail";
import AdminDraftEvents from "../../pages/AdminDraftEvents/AdminDraftEvents";

const Layout = () => {
  return (
    <React.Fragment>
      <div>
        <CssBaseline />
        <Header />
        <Slidebar />
        <Switch>
          <Route path="/app/clubs" component={Club} />
          <Route path="/app/club/:id" component={ClubDetail} />
          <Route path="/app/events/:page" component={Events} />
          <Route path="/app/admin/draft/:page" component={AdminDraftEvents} />
          <Route path="/app/event/:id" component={EventDetail} />
          <Route path="/app/posts" component={EventPost} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </React.Fragment>
  );
};

export default Layout;
