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
                  <label htmlFor="table_name">
                      Table Name:
                      <input
                      id="table_name"
                      type="text"
                      name="table_name"
                      onChange={changeHandler}
                      value={table.table_name}
                      required />
                  </label>
                  <label htmlFor="capacity">
                      Table Capacity:
                      <input
                      id="capacity"
                      type="number"
                      min="1"
                      max="10"
                      name="capacity"
                      onChange={capacityHandler}
                      value={table.capacity}
                      required />
                  </label>
                  <button type="submit">Submit</button>
                  <button onClick={onCancel}>Cancel</button>
              </form>
    )
}