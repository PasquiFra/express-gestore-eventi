const errorsLogger = require('../middlewares/errorsLogger.js');
const Event = require('../models/EventModel.js');
const Reservation = require('../models/Reservation.js');

//Creo i controller delle rotte /:event/reservations
const index = (req, res) => {

    const { event } = req.params;

    eventToShow = Event.getEventByID(event);

    if (!eventToShow || !eventToShow.length) {
        const err = new Error(`Non ci sono eventi in programma con questo id`);
        err.status = 404;
        return errorsLogger(err, req, res);
    }

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

    const { firstName, lastName, email, eventId } = req.body

    if (!firstName || !lastName || !email || !eventId) {
        const err = new Error(`Alcuni dati sono errati o inesistenti`);
        err.status = 404;
        return errorsLogger(err, req, res);
    }

    const newReservation = new Reservation(firstName, lastName, email, eventId);

    Reservation.saveReservation(newReservation)

    res.format({

        json: () => {
            res.status(200).json({
                message: "Prenotazione inserita con successo",
                data: newReservation
            })
        }

    })
}
const destroy = (req, res) => {

}

module.exports = {
    index,
    create,
    destroy
}