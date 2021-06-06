import React, { useState } from "react";
import {useHistory} from "react-router-dom"
import ErrorAlert from "../layout/ErrorAlert";
import SearchForm from "./SearchForm"
import {searchRes, updateReservationStatus} from "../utils/api"
import ResCard from "../Reservation/reservationCard"


export const Search = ({search, setSearch, onSubmit}) => {
  const history = useHistory()
  const [error, setError] = useState(null)
  const [reservations, setReservations] = useState(null)

  let cards = (null)

  function submitSearch(search) {
    setError(null)
    const abortController = new AbortController();
    searchRes({ search }, abortController.signal)
        .then(setReservations)
        .catch(setError);
      return () => abortController.abort();
}
  function onCancel() {
    history.goBack()
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
    .then(window.location.reload())
    .catch(setError)
    return () => abortController.abort()
  }
  if(reservations) {
    cards = reservations.map((reservation) =>
    <ResCard reservation={reservation} onEdit={onEdit} onDelete={onDelete}>
    </ResCard>
  )
  } 

  if(reservations) {
    if(!reservations.length) {
      cards = (<h5>No reservations found.</h5>)
    }
      return (
      <main>
      <h1>Search Reservations</h1>
      <ErrorAlert error={error}/>
      <SearchForm search={search} setSearch={setSearch} onSubmit={submitSearch} onCancel={onCancel}/>
      <div>{cards}</div>
    </main>
      );
  }
  return (
    <main>
    <h1>Search Reservations</h1>
    <ErrorAlert error={error}/>
    <SearchForm search={search} setSearch={setSearch} onSubmit={submitSearch} onCancel={onCancel}/>
  </main>
  )
    }



export default Search