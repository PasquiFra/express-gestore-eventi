//importo express e expressRouter
const express = require("express");
const router = express.Router();

// import dei controllers - middlewares
const eventController = require("../controllers/events")

// dichiaro le rotte
// rotta index
router.get("/", eventController);
// rotta create
router.post("/", eventController);
// rotta update
router.put("/:event", eventController);

