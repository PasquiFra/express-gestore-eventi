// import di file system e path
const fs = require("fs");
const path = require("path");

//import del model reservation
const Reservation = require("./Reservation");

// import dei middlewares
const errorsLogger = require('../middlewares/errorsLogger.js');

class Event {
    id;
    title;
    description;
    date;
    maxSeats;

    constructor(title, description, date, maxSeats) {

        this.id = this.createId();
        this.title = title;
        this.description = description;
        this.date = date;
        this.maxSeats = maxSeats;

    }

    static readJSONdata() {
        const filePath = path.join(__dirname, "../data/events.json");
        const data = fs.readFileSync(filePath, "utf-8");
        return JSON.parse(data);
    }

    static saveJSONdata(newData) {
        const filePath = path.join(__dirname, "../data/events.json");
        const newEvent = JSON.stringify(newData)
        fs.writeFileSync(filePath, newEvent);
    }

    createId() {
        const events = Event.readJSONdata()
        let id = 1;
        events.forEach(event => {
            if (event.id >= id) {
                id = event.id + 1
            }
        });
        return id
    }

    static saveEvent(newEvent) {
        const events = Event.readJSONdata();
        const newEventsList = [...events, newEvent];
        Event.saveJSONdata(newEventsList);
    }

    static getEventByID(id) {
        const events = Event.readJSONdata()
        return events.find(e => e.id == id)
    }

    static getEventByTitle(title) {
        const events = Event.readJSONdata()
        return events.filter(event => event.title.includes(title))
    }

    static getReservations(myEventId) {

        //lista prenotazioni
        const reservations = Reservation.readJSONdata();

        if (!reservations || !reservations.length) {
            const err = new Error(`Non ho trovato prenotazioni`);
            err.status = 404;
            return 'Non ho trovato prenotazioni';
        }

        //trovo la lista di prenotazioni per l'evento selezionato
        const eventReservations = reservations.filter(r => r.eventId == myEventId);

        return eventReservations
    }
}

module.exports = Event