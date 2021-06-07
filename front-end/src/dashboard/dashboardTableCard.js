import React from "react";


function DashTableCard({ table, onFinish }) {

  if(!table.reservation_id) {
    return (
      <div className="col-sm-12 col-md-6 col-lg-3 my-2">
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