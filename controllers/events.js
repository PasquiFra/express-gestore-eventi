const Event = require('../models/EventModel.js');

// Creo i controller delle rotte 
const index = (req, res) => {
    res.send("<h1>Sei entrato nella index</h1>")
}
const create = (req, res) => {

    console.log(req.body)
    const { title, description, date, maxSeats } = req.body

    const newEvent = new Event(title, description, date, maxSeats);

    Event.saveEvent(newEvent)

    res.format({

        json: () => {
            res.status(200).json({
                message: "Evento inserito con successo",
                data: newEvent
            })
        }

    })
}

const update = (req, res) => {
}

module.exports = {
    index,
    create,
    update
}