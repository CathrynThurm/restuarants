import React, {useState} from "react";
import {useHistory} from "react-router-dom"
import {createReservation} from "../utils/api"
import ErrorAlert from "../layout/ErrorAlert"
import ReservationForm from "./reservationForm"


export default function NewReservation({ reservation, setReservation, onSubmit})  {
    const history = useHistory()
    const [error, setError] = useState(null)

    function submitHanlder(reservation) {
        setError(null)
        createReservation(reservation).then(onSubmit).catch(setError)
    }

    function onCancel() {
        history.goBack()
    }
    return (
            <main>
                <h1 className="p-3">Create a new reservation</h1>
                <ErrorAlert error={error} />
                <ReservationForm reservation={reservation} setReservation={setReservation} onSubmit={submitHanlder} onCancel={onCancel}/>
        </main>
      );
    }