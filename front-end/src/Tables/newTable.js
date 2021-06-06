import React, {useState} from "react";
import {useHistory} from "react-router-dom"
import ErrorAlert from "../layout/ErrorAlert";
import TableForm from "./tableForm"
import {createTable} from "../utils/api"


export const Tables = ({ table, setTable, onSubmit}) => {
  const history = useHistory()
  const [error, setError] = useState(null)

  function submitHanlder(table) {
    setError(null)
    createTable(table).then(onSubmit).catch(setError)
    history.push("/dashboard")
}
  function onCancel() {
    history.goBack()
  }
    return (
        <main>
          <h1 className="p-3">Create a New Table</h1>
          <ErrorAlert error={error}/>
          <TableForm table={table} setTable={setTable} onSubmit={submitHanlder} onCancel={onCancel}/>
        </main>
      );
    }

export default Tables