//importo express e expressRouter
const express = require("express");
const router = express.Router();

// import dei controllers - middlewares
const eventController = require("../controllers/events")

// dichiaro le rotte
// rotta index
router.get("/", eventController.index);
// rotta create
router.post("/", eventController.create);
// rotta update
router.put("/:event", eventController.update);

module.exports = router