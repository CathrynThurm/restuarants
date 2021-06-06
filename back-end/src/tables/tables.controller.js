const service = require("./tables.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function list(req, res, next) {
    let data = await service.list()

    data.sort((a, b) => {
        if(a.table_name < b.table_name) { return -1}
        if(a.table_name > b.table_name) {return 1}
        else {return 0}
    })
    res.json({data})
}

async function tableExists(req, res, next) {
    const table_id = req.params.table_id
    const table = await service.read(table_id)

    if(table) {
        res.locals.table = table;
        return next();
    }
    return next({ status:404, message: `Table ${table_id} can not be found.`})
}

function validateCapacityType(req, res, next) {
    const capacity = req.body.data.capacity
    if(typeof(capacity) !=='number') {
        return next({ status:400, message:`Can not create a table with a non numeric capacity.`})
    }
    return next()
}

function validateTableNameLength(req, res, next) {
    const name = req.body.data.table_name
    if(!name) {
        return next({ status:400, message:`Can not create a table_name with less than 2 characters.`})
    }
    if(name.length < 2) {
        return next({ status:400, message:`Can not create a table_name with less than 2 characters.`})
    }
    return next()
}

function validateResId(req, res, next) {
    const resId = req.body.data.reservation_id
    if(!resId) {
        return next({ status:400, message: `Body must have a reservation_id.`})
    }
    return next()
}

function validateTableCapacity(req, res, next) {
    const capacity = req.body.data.capacity
    if(capacity < 1) {
        return next({ status:400, message:`Can not create a table with a capacity of less than 1.`})
    }
    return next()
}

async function create(req, res, next) {
    const data = await service.create(req.body.data)
    res.status(201).json({data:data})
  }

async function reservationExists(req, res, next) {
    const resId = req.body.data.reservation_id
    let reservation = await service.readRes(resId)
    if(reservation) {
        res.locals.reservation = reservation
        return next()
    }
    return next({status:404, message:`Reservation ${resId} does not exists.`})
}

function validateCapacity(req, res, next) {
    const resId = req.body.data.reservation_id
    const reservation = res.locals.reservation
    const table = res.locals.table
    if(table.capacity < reservation.people) {
        return next({ status: 400, message:`Table capacity is too small for this reservation.`})
    }
    return next()
}

async function createReservation(req, res, next) {
    const tableId = req.params.table_id
    const resId = req.body.data.reservation_id
    const table = await service.read(tableId)
    const updatedTable = {
        table_id: tableId,
        table_name: table.table_name,
        capacity: table.capacity,
        reservation_id: resId
      }
      await updateResStatus("seated", resId)
    const result = await service.update(updatedTable)
    res.json({ data: result})
}

async function updateResStatus(newStat, resId) {
    const updatedRes = {
        reservation_id: resId,
        status: newStat
    }
    return await service.updateStatus(updatedRes)
}

function validateStatusSeated(req, res, next) {
    let reservation = res.locals.reservation
    if(reservation.status == "seated") {
        return next({ status:400, message:`Reservation status is already seated`})
    }
    else {
        return next()
    }
}

async function destroy(req, res, next) {
    const table = await service.read(req.params.table_id)
    const updatedTable = {
        table_id: req.params.table_id,
        table_name: table.table_name,
        capacity: table.capacity,
        reservation_id: null,
    }
    await updateResStatus('finished', table.reservation_id)
    const result = await service.update(updatedTable)
    res.json({ data: result})
}

async function validateOccupied(req, res, next) {
    const table = res.locals.table
    if(table.reservation_id) {
        return next({status:400, message:`This table is occupied.`})
    }
    else {
        return next()
    }
}

function validateNotOccupied(req, res, next) {
    const table = res.locals.table
    if(table.reservation_id) {
        return next()
    }
    else {
        return next({ status:400, message: `This table is not occupied.`})
    }
}

function validateData(req, res, next) {
    if(!req.body.data) {
        return next({ status:400, message: `Must have a data field.`})
    }
    return next()
}


module.exports = {
    list: [asyncErrorBoundary(list)],
    create: [validateData, validateTableNameLength, validateTableCapacity, validateCapacityType, asyncErrorBoundary(create)],
    createReservation: [validateData, validateResId, asyncErrorBoundary(tableExists), asyncErrorBoundary(reservationExists), validateOccupied, validateCapacity, validateStatusSeated, asyncErrorBoundary(createReservation)],
    destroy: [asyncErrorBoundary(tableExists), validateNotOccupied, asyncErrorBoundary(destroy)]
}