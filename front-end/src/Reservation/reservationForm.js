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
                <label htmlFor="first_name">
                    First Name:
                    <input
                    id="first_name"
                    type="text"
                    name="first_name"
                    onChange={changeHandler}
                    value={reservation.first_name}
                    required />
                </label>
                <label htmlFor="last_name">
                    Last Name:
                    <input
                    id="last_name"
                    type="text"
                    name="last_name"
                    onChange={changeHandler}
                    value={reservation.last_name}
                    required />
                </label>
                <label htmlFor="mobile_number" >
                    Phone Number:
                    <input
                    id="mobile_number"
                    type="text"
                    name="mobile_number"
                    onChange={changeHandler}
                    value={reservation.mobile_number}
                    required />
                </label>
                <label htmlFor="reservation_date">
                    Reservation Date:
                    <input
                    id="reservation_date"
                    type="date"
                    name="reservation_date"
                    onChange={changeHandler}
                    value={reservation.reservation_date}
                    required />
                </label>
                <label htmlFor="reservation_time">
                    Reservation Time:
                    <input
                    id="reservation_time"
                    type="time"
                    name="reservation_time"
                    onChange={changeHandler}
                    value={reservation.reservation_time}
                    required />
                </label>
                <label htmlFor="people">
                    Party size:
                    <input
                    id="people"
                    type="number"
                    min="1"
                    max="10"
                    name="people"
                    onChange={peopleChangeHandler}
                    value={reservation.people}
                    required />
                </label>
                <button type="submit">Submit</button>
                <button onClick={onCancel}>Cancel</button>
            </form>
    )
}