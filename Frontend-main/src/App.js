import React from "react";
import { createBrowserHistory } from "history";
import { connect } from "react-redux";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import Admin from "./layouts/Admin";
import Minimal from "./layouts/Minimal";

const hist = createBrowserHistory();

const App = (props) => {
  const { auth } = props;

  return (
    <Router history={hist}>
      <Switch>
        {auth ? (
          <Route path="/admin" component={Admin} />
        ) : (
          <Route path="/auth" component={Minimal} />
        )}
        <Route path="/">
          {auth ? <Redirect to="/admin" /> : <Redirect to="/auth" />}
        </Route>
      </Switch>
    </Router>
  );
};

const mapStateToProps = (state) => {
  const { auth } = state;
  return { auth };
};

export default connect(mapStateToProps, null)(App);
