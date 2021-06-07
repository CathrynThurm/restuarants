import React, { useState } from "react";
import Menu from "./Menu";
import Dashboard from "../dashboard/Dashboard";
//import NotFound from "./NotFound";
import { today } from "../utils/date-time";
import { Route, Switch, useHistory, useLocation } from "react-router-dom"
import NewReservation from "../Reservation/newReservation"
import NewTable from "../Tables/newTable"
import Search from "../Search/search"
import "./Layout.css";
import EditReservation from "../Reservation/editReservation"
import SeatReservation from "../Reservation/seatReservation"
import NotFound from "./NotFound"


const initialReservationState = {
  first_name: "",
  last_name: "",
  mobile_number: "",
  reservation_date: "",
  reservation_time: "",
  people: 1
}

const initialTable = {
  table_name: "",
  capacity: ""
}
const initialSearch = {
  mobile_number: ""
}
/**
 * Defines the main layout of the application.
 *
 * You will not need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
 function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Layout() {
  const [reservation, setReservation] = useState({ ...initialReservationState })
  const [table, setTable] = useState({ ...initialTable })
  const [search, setSearch] = useState({ ...initialSearch })
  const history = useHistory()

  let date = useQuery().get("date")
  let param = date
  if(!date) {
    param = today()
  }

  function onSubmitRes() {
    history.push(`/dashboard?date=${reservation.reservation_date}`)
    setReservation({ ...initialReservationState })
  }
  function submitTable() {
    setTable({ ...initialTable })
  }
  function submitSearch() {
    setSearch({ ...initialSearch })
  }
  return (
    <div className="container-fluid">
      <div className="row h-100">
        <div className="col-md-2 side-bar">
          <Menu />
        </div>
        <div className="col">
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
            <Route path="/reservations/:res_id/edit">
              <EditReservation reservation={reservation} setReservation={setReservation} onSubmit={onSubmitRes} />
            </Route>
            <Route path="/reservations/:reservation_id/seat">
              <SeatReservation />
            </Route>
            <Route path="/reservations/new">
              <NewReservation reservation={reservation} setReservation={setReservation} onSubmit={onSubmitRes} />
            </Route>
            <Route path="/tables/new">
              <NewTable table={table} setTable={setTable} onSubmit={submitTable} />
            </Route>
            <Route path="/search">
              <Search search={search} setSearch={setSearch} onSubmit={submitSearch} />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default Layout;
