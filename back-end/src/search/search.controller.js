const service = require("./search.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function search(req, res, next) {
    const mobileNumber = req.query.mobile_phone
    const data = await service.search(mobileNumber)
    if(!data.length) {
    return next({ status:404, message: `No reservations found.`})

    }
    res.json({data});
}

module.exports = {
    search: [asyncErrorBoundary(search)]
}