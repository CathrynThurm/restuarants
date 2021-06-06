import React from "react";
import {useHistory} from "react-router-dom"

function ResCard({ reservation, onEdit, onDelete }) {
  const history = useHistory()
  const reservation_id = reservation.reservation_id

  if(reservation.status!== 'booked') {
    return (
      <div className="col-sm-12 col-md-6 col-lg-3 my-2">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title text-truncate">{ reservation.first_name} {reservation.last_name}</h5>
            <p className="card-text">Time: {reservation.reservation_time} Date: {reservation.reservation_date}</p>
            <p className="card-text">People: {reservation.people}</p>
            <p data-reservation-id-status={reservation.reservation_id} className="card-text">Status: {reservation.status}</p>
            <button className="btn" onClick={() => onEdit(reservation.reservation_id)}><a href={`/reservations/${reservation_id}/edit`}>
             Edit</a>
          </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="col-sm-12 col-md-6 col-lg-3 my-2">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title text-truncate">{ reservation.first_name} {reservation.last_name}</h5>
          <p className="card-text">Time: {reservation.reservation_time} Date: {reservation.reservation_date}</p>
          <p className="card-text">People: {reservation.people}</p>
          <p data-reservation-id-status={reservation.reservation_id} className="card-text">Status: {reservation.status}</p>
          <button className="btn" onClick={() => onEdit(reservation.reservation_id)}><a href={`/reservations/${reservation_id}/edit`}>
             Edit</a>
        </button>
        <button className="btn" onClick={() => {if(window.confirm('Do you want to cancel this reservation?')) {onDelete(reservation)}}}>Cancel</button>
        <button className="btn" onClick={() => history.push(`/reservations/${reservation.reservation_id}/seat`)}><a href={`/reservations/${reservation_id}/seat`}>
          Seat</a></button>
        </div>
      </div>
    </div>
  );
}

export default ResCard;