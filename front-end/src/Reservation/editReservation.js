import React, { useEffect, useState } from "react";
import {useHistory, useParams} from "react-router-dom"
import { readReservation} from "../utils/api"
import ErrorAlert from "../layout/ErrorAlert";
import ReservationForm from "./reservationForm"
import {updateReservation} from "../utils/api"

export default function EditReservation () {
    const history = useHistory()
    const [error, setError] = useState(null)
    const {res_id} = useParams()
    const [reservation, setReservation] = useState({})

    useEffect(() => {
        const abortController = new AbortController()
        readReservation(res_id, abortController.signal).then(setReservation).catch(setError)
        return () => abortController.abort()
    }, [res_id])
    
    function submitHandler(updatedRes) {
        updateReservation(updatedRes)
        .then((savedRes) => history.goBack())
        .catch(setError)
    }
      function onCancel() {
        history.goBack()
      }
    return (
        <main>
            <h1>Update Existing Reservation</h1>
            <ErrorAlert error={error} />
            <ReservationForm reservation={reservation} setReservation={setReservation} onSubmit={submitHandler} onCancel={onCancel}/>
        </main>
    )
}