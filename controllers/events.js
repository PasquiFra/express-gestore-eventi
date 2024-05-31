const Event = require('../models/EventModel.js');

// Creo i controller delle rotte /events
const index = (req, res) => {

    const events = Event.readJSONdata();

    if (req.query.id) {

        const { id } = req.query

        eventToShow = events.find(event => event.id == id)

        if (!eventToShow) {
            return res.status(404).send("Evento non trovato!")
        }

        return res.format({

            json: () => {
                res.status(200).json({
                    message: `Restituisco l'evento con id ${id}`,
                    data: eventToShow
                })
            }

        })
    }


    res.format({

        json: () => {
            res.status(200).json({
                message: "Lista degli eventi in programma:",
                data: events
            })
        }

    })

}
const create = (req, res) => {

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