import React from "react"

export default function SearchForm({
    search = {
        mobile_number:""
    },
    setSearch,
    onSubmit,
    onCancel
}) {

    function changeHandler({ target: {name, value }}) {
        setSearch((previousRes) => ({
            ...previousRes,
            [name]: value,
        }))
    }
    function submitHandler(event) {
        event.preventDefault();
        event.stopPropagation();
        onSubmit(search)
    }
    return (
        <form onSubmit={submitHandler}>
            <div className="form-group ml-3">
            <label htmlFor="search">
                Search: </label>
                <input
                className="form-control col-3"
                id="mobile_number"
                type="text"
                name="mobile_number"
                onChange={changeHandler}
                value={search.mobile_number}
                placeholder="Phone number"
                required />
            </div>
            <button className="btn btn-dark m-3" type="submit">Search</button>
            <button className="btn btn-dark m-3" onClick={onCancel}>Cancel</button>
        </form>
)
}