import React, {useState} from "react";
import { useHistory } from "react-router";
import { seatReservation, finishReservation } from "../utils/api"
import ErrorAlert from "../layout/ErrorAlert"


function TableCard({ table, res_id }) {
  const [error, setError] = useState(null)

  function addResToTable(table) {
    seatReservation(table, res_id)
        .then()
        .catch(setError)
  }
  function onCancel() {
    history.goBack()
  }
  
  function onFinish(table) {
    finishReservation(table)
    .then()
    .catch(setError)
  }
    const history = useHistory()
    let status = "Free"
    if(table.reservation_id) {
        status = "Occupied"
    }
  if(status === "Free") {
    return (
      <div className="col-sm-12 col-md-6 col-lg-3 my-2">
        <ErrorAlert error={error} />
        <div className="card">
          <div className="card-body">
            <h5 data-table-id-status={table.table_id} className="card-title text-truncate">{table.table_name} - {table.capacity}</h5>
            <p>{status}</p>
            <button className="btn" onClick={() => addResToTable(table)}>
              <span className="oi oi-plus" /> Seat
          </button>
          <button className="btn" onClick={onCancel}><span className="oi"/>Cancel</button>
          </div>
        </div>
      </div>
    );
  }
  else {
    return (
      <div className="col-sm-12 col-md-6 col-lg-3 my-2">
        <ErrorAlert error={error} />
        <div className="card">
          <div className="card-body">
            <h5 data-table-id-status={table.table_id} className="card-title text-truncate">{ table.table_name} - {table.capacity}</h5>
            <p>{status}</p>
            <button data-table-id-finish={table.table_id} className="btn" onClick={() => {if(window.confirm('Is this table ready to seat new guests?')) {onFinish(table)}}}>Finish</button>
          <button className="btn" onClick={onCancel}><span className="oi"/>Cancel</button>
          </div>
        </div>
      </div>
    );
  }

}

export default TableCard;