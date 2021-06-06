const router = require("express").Router();
const controller = require("./tables.controller");
const methodNotAllowed = require("../errors/methodNotAllowed")

router.route("/new").put(controller.create).all(methodNotAllowed)
router.route("/:table_id/seat/").put(controller.createReservation).delete(controller.destroy).all(methodNotAllowed)
router.route("/").get(controller.list).post(controller.create).all(methodNotAllowed)



module.exports = router;