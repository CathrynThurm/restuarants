const knex = require("../db/connection");

function list(date) {
    return knex("reservations")
    .select("*")
    .whereNot({status: 'finished'})
    .andWhere({reservation_date:date})
}

function create(newReservation) {

    return knex("reservations")
    .insert(newReservation)
    .returning("*")
    .then((createdRecord) => createdRecord[0])
}

function read(reservationId) {

  return knex("reservations")
  .select("*")
  .where({reservation_id: reservationId}).first()
}

function search(mobile_number) {
    return knex("reservations")
      .whereRaw(
        "translate(mobile_number, '() -', '') like ?",
        `%${mobile_number.replace(/\D/g, "")}%`
      )
      .orderBy("reservation_date");
  }


function update(updatedRes) {
  return knex("reservations")
  .where({ reservation_id: updatedRes.reservation_id})
  .update(updatedRes)
  .then( function () {
    return knex.select("*")
    .from("reservations")
    .where({ reservation_id: updatedRes.reservation_id}).first()
  })
}

module.exports = {
    list,
    create,
    search,
    read,
    update
}