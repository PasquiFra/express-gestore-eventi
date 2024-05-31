const errorsLogger = require('../middlewares/errorsLogger.js');
const Event = require('../models/EventModel.js');

//Creo i controller delle rotte /events
const index = (req, res) => {

    const events = Event.readJSONdata();

    // se ho una query che vuole filtrare per id entro qua 
    if (req.query.id) {

        const id = req.query.id

        eventToShow = events.find(e => e.id == id)

        if (!eventToShow) {
            const err = new Error(`Evento non trovato`);
            err.status = 404;
            return errorsLogger(err, req, res);
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

    // se ho una query che vuole filtrare per titolo entro qua 
    if (req.query.title) {
        const { title } = req.query

        console.log("entrato", title)


        eventsToShow = events.filter(event => event.title.includes(title))

        if (!eventsToShow) {
            const err = new Error(`Evento/i non trovato/i`);
            err.status = 404;
            return errorsLogger(err, req, res);
        }

        return res.format({

            json: () => {
                res.status(200).json({
                    message: `Eventi trovati`,
                    data: eventsToShow
                })
            }

        })
    }

    // Altrimenti se non ho query restituisco tutti gli eventi
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