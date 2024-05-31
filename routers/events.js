//importo express e expressRouter
const express = require("express");
const router = express.Router();

// import dei controllers - middlewares
const eventController = require("../controllers/events")
const reservationsController = require("../controllers/reservations")

//! dichiaro le rotte >> /events <<
// rotta index
router.get("/", eventController.index);
// rotta create
router.post("/", eventController.create);
// rotta update
router.put("/:event", eventController.update);

// ROTTE PRENOTAZIONI
// rotta index
router.get("/:event/reservations", reservationsController.index);
// rotta store
router.post("/:event/reservations", reservationsController.create);
// rotta destroy
router.delete("/:event/reservations/:reservation", reservationsController.destroy);


module.exports = router