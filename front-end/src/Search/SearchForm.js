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
            <label htmlFor="search">
                Search:
                <input
                id="mobile_number"
                type="text"
                name="mobile_number"
                onChange={changeHandler}
                value={search.mobile_number}
                placeholder="Phone number"
                required />
            </label>
            <button type="submit">Search</button>
            <button onClick={onCancel}>Cancel</button>
        </form>
)
}