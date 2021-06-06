import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { listTables } from "../utils/api"
import ErrorAlert from "../layout/ErrorAlert";
import TableCard from "../Tables/cardTable"

export default function SeatReservation() {
    const [error, setError] = useState(null)
    const  {reservation_id}  = useParams()
    const [tables, setTables] = useState([])

    useEffect(loadTables, [])

    function loadTables() {
        const abortController = new AbortController();
        setError(null);
        listTables(abortController.signal)
            .then(setTables)
            .catch(setError);
        return () => abortController.abort();
    }

    let cards = tables.map((table) =>
        <TableCard table={table} res_id={reservation_id}>
        </TableCard>
    )

    return (
        <main>
            <h1>Tables</h1>
            <ErrorAlert error={error} />
            <p>{cards}</p>
        </main>
    )
}
