import React, {useState} from "react";
import Menu from "./Menu";
import Routes from "./Routes";
import {Route, Switch, useHistory} from "react-router-dom"
import NewReservation from "../Reservation/newReservation"
import NewTable from "../Tables/newTable"
import Search from "../Search/search"
import "./Layout.css";
import EditReservation from "../Reservation/editReservation"
import SeatReservation from "../Reservation/seatReservation"


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
function Layout() {
  const [reservation, setReservation] = useState({...initialReservationState})
  const [table, setTable] =  useState({...initialTable})
  const [search, setSearch] = useState({...initialSearch})
  const history = useHistory()

  function onSubmitRes() {
    history.push(`/dashboard?date=${reservation.reservation_date}`)
    setReservation({...initialReservationState})
  }
  function submitTable() {
    setTable({...initialTable})
  }
  function submitSearch() {
    setSearch({...initialSearch})
  }
  return (
    <div className="container-fluid">
      <div className="row h-100">
        <div className="col-md-2 side-bar">
          <Menu />
        </div>
        <div className="col">
          <Routes />
          <Switch>
            <Route path="/reservations/:res_id/edit">
              <EditReservation reservation={reservation} setReservation={setReservation} onSubmit={onSubmitRes}/>
            </Route>
            <Route path="/reservations/:reservation_id/seat">
              <SeatReservation />
            </Route>
            <Route path="/reservations/new">
              <NewReservation reservation={reservation} setReservation={setReservation} onSubmit={onSubmitRes}/>
            </Route>
            <Route path="/tables/new">
              <NewTable table={table} setTable={setTable} onSubmit={submitTable}/>
            </Route>
            <Route path="/search">
              <Search search={search} setSearch={setSearch} onSubmit={submitSearch} />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default Layout;
