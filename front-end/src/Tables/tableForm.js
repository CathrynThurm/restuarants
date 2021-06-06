import React from "react";

export default function TableForm({
    table = {
        table_name: "",
        capacity: 1
    },
    setTable,
    onCancel,
    onSubmit
}) {
    function changeHandler({ target: {name, value }}) {
        setTable((previousRes) => ({
            ...previousRes,
            [name]: value,
        }))
    }
    function capacityHandler({ target: {name, value}}) {
        setTable((previousRes) => ({
            ...previousRes,
            [name]: parseInt(value)
        }))
    }
    function submitHandler(event) {
        event.preventDefault();
        event.stopPropagation();
        onSubmit(table)
    }
    return (
              <form onSubmit={submitHandler}>
                  <div className="form-group">
                  <label htmlFor="table_name">
                      Table Name: </label>
                      <input
                      className="form-control col-3"
                      id="table_name"
                      type="text"
                      name="table_name"
                      onChange={changeHandler}
                      value={table.table_name}
                      required />
                  </div>
                  <div className="form-group">
                  <label htmlFor="capacity">
                      Table Capacity: </label>
                      <input
                      className="form-control col-3"
                      id="capacity"
                      type="number"
                      min="1"
                      max="10"
                      name="capacity"
                      onChange={capacityHandler}
                      value={table.capacity}
                      required />
                    </div>
                  <button className="m-5 btn btn-dark" type="submit">Submit</button>
                  <button className="btn btn-dark" onClick={onCancel}>Cancel</button>
              </form>
    )
}