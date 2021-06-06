import React from "react";

import { Route, Switch, useLocation } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
//import NotFound from "./NotFound";
import { today } from "../utils/date-time";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
 function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Routes() {
  let date = useQuery().get("date")
  let param = date
  if(!date) {
    param = today()
  }

  return (
    <Switch>
      <Route path="/dashboard">
        <Dashboard date={param} />
      </Route>
      <Route exact={true} path="/">
        <Dashboard date={param} />
      </Route>
      <Route exact={true} path="/reservations">
        <Dashboard date={param} />
      </Route>
    </Switch>
  );
}

export default Routes;
