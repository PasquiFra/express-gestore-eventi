const errorsLogger = require('../middlewares/errorsLogger.js');
const Event = require('../models/EventModel.js');

//Creo i controller delle rotte /:event/reservations
const index = (req, res) => {

    const { event } = req.params;

    eventToShow = Event.getEventByID(event);

    const eventReservations = Event.getReservations(eventToShow.id);

    //restituisco le prenotazioni
    res.format({

        json: () => {
            res.status(200).json({
                message: `Lista delle prenotazioni pre l'evento ${eventToShow.title}`,
                data: eventReservations
            })
        }

    })
}
const create = (req, res) => {

}
const destroy = (req, res) => {

}

module.exports = {
    index,
    create,
    destroy
}