import React from "react";

export default function ReservationForm({ 
    reservation = {
        first_name: "",
        last_name: "",
        mobie_number: "",
        reservation_date: "",
        reservation_time: "",
        people: 1,
        status: "booked"
    },
    setReservation,
    onCancel,
    onSubmit
}) {
    function changeHandler({ target: {name, value }}) {
        setReservation((previousRes) => ({
            ...previousRes,
            [name]: value,
        }))
    }

    function peopleChangeHandler({ target: {name, value}}) {
        setReservation((previousRes) => ({
            ...previousRes,
            [name]: parseInt(value)
        }))
    }
    function submitHander(event) {
        event.preventDefault();
        event.stopPropagation();
        onSubmit(reservation)
    }
    return (
        <form onSubmit={submitHander}>
            <div className="form-group">
                <label htmlFor="first_name">First Name: </label>
                    <input
                    className="form-control col-3"
                    id="first_name"
                    type="text"
                    name="first_name"
                    onChange={changeHandler}
                    value={reservation.first_name}
                    required /> </div>
            <div className="form-group">
                <label htmlFor="last_name">
                    Last Name: </label>
                    <input
                    className="form-control col-3"
                    id="last_name"
                    type="text"
                    name="last_name"
                    onChange={changeHandler}
                    value={reservation.last_name}
                    required /> 
                </div>
            <div className="form-group">
                <label htmlFor="mobile_number" >
                    Phone Number: </label>
                    <input
                    className="form-control col-3"
                    id="mobile_number"
                    type="text"
                    name="mobile_number"
                    onChange={changeHandler}
                    value={reservation.mobile_number}
                    required />
            </div>
            <div className="form-group">
                <label htmlFor="reservation_date">
                    Reservation Date: </label>
                    <input
                    className="form-control col-3"
                    id="reservation_date"
                    type="date"
                    name="reservation_date"
                    onChange={changeHandler}
                    value={reservation.reservation_date}
                    required />
            </div>
            <div className="form-group">
                <label htmlFor="reservation_time">
                    Reservation Time: </label>
                    <input
                    className="form-control col-3"
                    id="reservation_time"
                    type="time"
                    name="reservation_time"
                    onChange={changeHandler}
                    value={reservation.reservation_time}
                    required />
            </div>
            <div className="form-group">
                <label htmlFor="people">
                    Party size: </label>
                    <input
                    className="form-control col-3"
                    id="people"
                    type="number"
                    min="1"
                    max="10"
                    name="people"
                    onChange={peopleChangeHandler}
                    value={reservation.people}
                    required />
            </div>
                <button className="m-5 btn btn-dark" type="submit">Submit</button>
                <button className="btn btn-dark" onClick={onCancel}>Cancel</button>
            </form>
    )
}