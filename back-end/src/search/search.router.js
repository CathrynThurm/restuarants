const router = require("express").Router();
const controller = require("./search.controller");
const methodNotAllowed = require("../errors/methodNotAllowed")


router.route("/reservations").get(controller.search).all(methodNotAllowed)

module.exports = router;