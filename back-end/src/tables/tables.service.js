const knex = require("../db/connection")

function list() {
    return knex("tables")
    .select("*")
}

function read(tableId) {
    return knex("tables")
    .select("*")
    .where({table_id: tableId}).first()
}

function readRes(reservationId) {
    return knex("reservations")
    .select("*")
    .where({reservation_id: reservationId}).first()
  }

function create(newTable) {

    return knex("tables")
    .insert(newTable)
    .returning("*")
    .then((createdRecord) => createdRecord[0])
}

function createReservation(newRes) {

    return knex("tables")
    .insert(newRes)
    .where({"table_id":newRes.table_id}).first()
}

function destroy(tableId) {
    return knex("tables").where({ table_id: tableId}).del()
}

function update(updated) {
    return knex("tables")
    .where({ table_id: updated.table_id})
    .update(updated)
    .then( function () {
      return knex.select("*")
      .from("tables")
      .where({ table_id: updated.table_id})
    })
  }
function updateStatus(updated) {
    return knex("reservations")
    .where({ reservation_id: updated.reservation_id})
    .update(updated)
    .then( function () {
        return knex.select("*")
        .from("reservations")
        .where({ reservation_id: updated.reservation_id})
    })
}

module.exports = {
    list,
    create,
    createReservation,
    read,
    destroy,
    readRes,
    update,
    updateStatus
}