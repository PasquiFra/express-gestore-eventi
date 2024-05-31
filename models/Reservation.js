// import di file system e path
const fs = require("fs");
const path = require("path");


class Reservation extends Event {
    id;
    firstName;
    lastName;
    email;
    eventId;

    constructor(firstName, lastName, email, eventId) {

        this.id = this.createId();
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.eventId = eventId;

    }

    static readJSONdata() {
        const filePath = path.join(__dirname, "../data/reservations.json");
        const data = fs.readFileSync(filePath, "utf-8");
        return JSON.parse(data);
    }

    static saveJSONdata(newData) {
        const filePath = path.join(__dirname, "../data/reservations.json");
        const newReservation = JSON.stringify(newData)
        fs.writeFileSync(filePath, newReservation);
    }

    createId() {
        const reservations = Reservation.readJSONdata()
        let id = 1;
        reservations.forEach(reservation => {
            if (reservation.id >= id) {
                id = reservation.id + 1
            }
        });
        return id
    }

    static saveEvent(newReservation) {
        const reservations = Reservation.readJSONdata();
        const newReservationsList = [...reservations, newReservation];
        Reservation.saveJSONdata(newReservationsList);
    }

}

module.exports = Reservation