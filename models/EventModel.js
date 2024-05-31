// import di file system e path
const fs = require("fs");
const path = require("path");


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
}

module.exports = Event