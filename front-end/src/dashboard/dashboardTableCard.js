import React, {useState} from "react";
import ErrorAlert from "../layout/ErrorAlert"


function DashTableCard({ table, onFinish }) {
  const [error, setError] = useState(null)

  if(!table.reservation_id) {
    return (
      <div className="col-sm-12 col-md-6 col-lg-3 my-2">
        <ErrorAlert error={error} />
        <div className="card">
          <div className="card-body">
            <h5 className="card-title text-truncate">{table.table_name} - {table.capacity}</h5>
            <p>Free</p>
          </div>
        </div>
      </div>
    );
  }
  else {
    return (
      <div>
        <ErrorAlert error={error} />
        <div className="card">
          <div className="card-body">
            <h5 className="card-title text-truncate">{ table.table_name} - {table.capacity}</h5>
            <p>Occupied</p>
            <button className="btn" onClick={() => onFinish(table)}>Finish</button>
          </div>
        </div>
      </div>
    );
  }

}

export default DashTableCard;