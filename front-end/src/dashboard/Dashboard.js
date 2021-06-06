import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import { finishReservation } from "../utils/api"
import ErrorAlert from "../layout/ErrorAlert"
import ResCard from "../Reservation/reservationCard"
import DashTableCard from "./dashboardTableCard"
import {useHistory} from "react-router-dom"
import {updateReservationStatus} from "../utils/api"
import { today } from "../utils/date-time";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function formatDate(date) {
  date = new Date(date)
  let dd = String(date.getDate()).padStart(2, '0')
  let mm = String(date.getMonth() + 1).padStart(2, '0')
  let yyyy = date.getFullYear();

    date = yyyy+"-"+mm+"-"+dd
    return date
}

function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([])
  const [reservationsError, setReservationsError] = useState(null);
  const [tablesError, setTablesError] = useState(null)
  const [error, setError] = useState(null)
  let resCards = (null)
  let tableCards = (null)
  let history = useHistory()

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listTables(abortController.signal)
    .then(setTables)
    .catch(setTablesError)
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }
  function onEdit(res_id) {
    history.push(`/reservations/${res_id}/edit`)
  }
  function onDelete(reservation) {
    const updatedReservation = {
      ...reservation,
      status: "cancelled"
    }
    setError(null)
    const abortController = new AbortController()
    updateReservationStatus({updatedReservation}, abortController.signal)
    .then()
    .catch(setError)
    return () => abortController.abort()
  }
  function onDateChange(next) {
    const urlParams = new URLSearchParams(window.location.search);
    let myParam = urlParams.get('date');
    myParam = myParam.replaceAll("-", "/")
    let param = new Date(myParam)
    let date = new Date(param)
    if(next) {
      date.setDate(param.getDate() + 1)
    }
    else {
      date.setDate(param.getDate() - 1)
    }
    date = formatDate(date)
    history.push(`/dashboard?date=${date}`)
    window.location.reload()
  }
  
  function onToday() {
    let param = today()
    history.push(`/dashboard?date=${param}`)
    window.location.reload()
  }
  function onFinish(table) {
    finishReservation(table)
    .then()
    .catch(setError)
  }

  if(reservations) {
    resCards = reservations.map((reservation) =>
    <ResCard reservation={reservation} onEdit={onEdit} onDelete={onDelete}>
    </ResCard>
  )
  } 
  if(tables) {
    tableCards = tables.map((table) => 
      <DashTableCard table={table} onFinish={onFinish}>
      </DashTableCard>
    )
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date {date}</h4>
      </div>
      <div>
        <button onClick={() => onDateChange(false)}>Previous</button>
        <button onClick={onToday}>Today</button>
        <button onClick={() => onDateChange(true)}>Next</button>
      </div>
      <ErrorAlert error={reservationsError} />
      {resCards}
      <h4>Tables</h4>
      <ErrorAlert error={tablesError} />
      {tableCards}
    </main>
  );
}

export default Dashboard;
