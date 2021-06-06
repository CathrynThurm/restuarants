const service = require("./dashboard.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")


async function list(req, res, next) {
    let data = await service.list()
    data.forEach((table) => {
        if(table.reservation_id == null) {
            table.reservation_status = "Free"
        }
        else {
            table.reservation_status = "Occupied"
        }
    })
    res.json({data});
}

module.exports = {
    list: [asyncErrorBoundary(list)]
}