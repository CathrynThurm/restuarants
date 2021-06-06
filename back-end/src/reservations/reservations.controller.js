const service = require("./reservations.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function reservationExists(req, res, next) {
  const {reservation_id} = req.params

  const reservation = await service.read(reservation_id)

  if(reservation) {
    res.locals.reservation = reservation
    return next();
  }
  return next({ status: 404, message: `Reservation ${reservation_id} cannot be found.`})
}

function validatePeople(req, res, next) {
  const reser = req.body.data
  if(!reser || !reser.people) {
    return next({ status:400, message:`Reservation field people must exist.`})
  }

  return next()
}

function validatePeoplePositive(req, res, next) {
  const reser = req.body.data
  if(reser.people==0) {
    return next({ status:400, message:`Reservation field people must be above 0.`})
  }
  return next()
}

function validatePeopleNumber(req, res, next) {
  const reser = req.body.data
  if(typeof(reser.people) !="number") {
    return next({ status:400, message:`Reservation field people must be type of number.`})
  }
  return next()
}

// fix this function
function validateData(req, res, next) {
 // const {first_name, last_name, mobile_number, reservation_date, reservation_time, people} = req.body.data
  if(!req.body.data) {
    return next({ status:400, message:`Data field missing.`})
  }
  return next()
}

function validateTime(req, res, next) {
  const reser = req.body.data
  if(!reser.reservation_time) {
    return next({ status:400, message:`reservation_time must have a valid time property.`})
  }
  return next()
}

function validateDate(req, res, next) {
  const reser = req.body.data
  if(!reser.reservation_date || !Date.parse(reser.reservation_date)) {
    return next({ status:400, message:`reservation_date must have a date property.`})
  }
  return next()
}

function validateMobile(req, res, next) {
  const reser = req.body.data
  if(!reser.mobile_number) {
    return next({ status:400, message:`mobile_number must have a value.`})
  }
  return next()
}

function validateLastName(req, res, next) {
  const reser = req.body.data
  if(!reser.last_name) {
    return next({ status: 400, message:`last_name must have a value.`})
  }
  return next()
}

function validateFirstName(req, res, next) {
  const reser = req.body.data
  if(!reser.first_name) {
    return next({ status: 400, message:`first_name must have a value.`})
  }
  return next()
}

async function read(req, res, next) {
  const result = res.locals.reservation
  return res.status(200).json({ data: result})
}

function validateStatus(req, res, next) {
  const reservationStatus = res.locals.reservation.status

  if(reservationStatus =='booked') {
    return next()
  }
  return next({ status: 400, message: `Reservation status can not be finished or cancelled.`})
}

function validateReqStatus(req, res, next) {
  const stat = req.body.data.status
  if(stat === 'unknown') {
    return next({ status:400, message: `Status attribute can not be unknown.`})
  }
  return next()
}

// this function needs work. Does not always choose tuesday.
function validateDayOfWeek(req, res, next) {
  const date = new Date(req.body.data.reservation_date)
  const day = date.getDay()
  if(day == 1) {
    return next({ status: 400, message: `Restaurant is closed on Tuesday.`});
  }
  return next();
}

function validateTimeOfDay(req, res, next) {
  const resTime = req.body.data.reservation_time
  if(resTime<"10:30:00" || resTime>"21:30:00") {
    return next({status:400, message: `Fix field reservation_time. Can not make a reservation an hour before or after opening.`})
  }
  return next();
}
// this returns the wrong date because of time zone issues???? fix later
function formatDate(date) {
  date = new Date(date)
  let dd = String(date.getDate()).padStart(2, '0')
  let mm = String(date.getMonth() + 1).padStart(2, '0')
  let yyyy = date.getFullYear();

    date = yyyy+"-"+dd+"-"+mm
    return date
}

function validateTimeIsFuture(req, res, next) {
  let resDate = new Date(req.body.data.reservation_date)
  resDate = formatDate(resDate)

  const resTime = req.body.data.reservation_time
  const now = new Date();
  const currentTime = now.getHours()+":"+now.getMinutes()+":"+now.getSeconds()
  const today = formatTodaysDate()
  if(resDate==today) {
    if(resTime < currentTime) {
      return next({ status:400, message: `Can not make a reservation earlier than the current time.`})
    }
  }
  return next()
}

function validateDateIsFuture(req, res, next) {
  let date = formatDate(req.body.data.reservation_date)
  const today = formatTodaysDate()
  if(date < today) {
    return next({ status:400, message: `Reservation must be in the future.`})
  }
  return next();
}

function redirectToTables(req, res, next) {
  res.redirect('/tables/:table_id/seat')
}

function formatTodaysDate() {
  let date = new Date()
  let dd = String(date.getDate()).padStart(2, '0')
  let mm = String(date.getMonth() + 1).padStart(2, '0')
  let yyyy = date.getFullYear();

    date = yyyy+"-"+mm+"-"+dd
    return date
}
// TODO come back and refinish the dates
async function list(req, res, next) {
  let data = null
  let date = req.query.date
  let number = req.query.mobile_number
  if(!date && !number) {
    date = formatTodaysDate()
  }
  if(number) {
    data = await service.search(number)
  }
  else {
    data = await service.list(date)
  }
  if(!data.length && !number) {
    return next({ status:400, message: `No reservations for ${date}.`})
  }
  
  data.sort((a,b) => {
    if(a.reservation_time < b.reservation_time) { return -1}
    if(a.reservation_time > b.reservation_time) { return 1}
    else {return 0}
  })
  res.json({data});
}

async function create(req, res, next) {
  const data = await service.create(req.body.data)
  res.status(201).json({data:data})
}

async function update(req, res, next) {
  const updatedRes = {
    ...req.body.data,
    reservation_id: res.locals.reservation.reservation_id
  }

  const result = await service.update(updatedRes)
  res.json({ data: result})
}

function validateStatusFinished(req, res, next) {
  const stat = req.body.data.status
  if(stat === 'finished') {
    return next({status: 400, message:`Status can not equal finished`})
  }
  return next()
}

function validateStatusSeated(req, res, next) {
  const stat = req.body.data.status
  if(stat == 'seated') {
    return next({ status:400,message:`Status can not equal seated`})
  }
  return next()
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [validateData, validateStatusFinished, validateStatusSeated, validateDayOfWeek, validateTimeIsFuture, validateLastName, validateFirstName, validateTime, validateDate, validateMobile, validateDateIsFuture, validateTimeOfDay, validatePeople, validatePeopleNumber, validatePeoplePositive, asyncErrorBoundary(create)],
  redirectToTables,
  update: [
    asyncErrorBoundary(reservationExists),asyncErrorBoundary(validatePeople), validateStatus,
     validateTimeIsFuture, validateDayOfWeek, validateTimeOfDay, validateDateIsFuture,
      validateMobile, validateDate, validateTime, validateLastName, validateFirstName, validatePeopleNumber,
        asyncErrorBoundary(update)],
  updateStatus: [validateReqStatus, asyncErrorBoundary(reservationExists), validateStatus, asyncErrorBoundary(update)],
  read: [asyncErrorBoundary(reservationExists), asyncErrorBoundary(read)]
};
