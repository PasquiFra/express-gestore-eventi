// import di file system e path
const fs = require("fs");
const path = require("path");


class Event {
    id;
    title;
    description;
    date;
    maxSeats;

    constructor(id, title, description, date, maxSeats) {

    }

    static readJSONdata() {
        const filePath = path.join(__dirname, "data/events.json");
        const data = fs.readFileSync(filePath, "utf-8");
        return JSON.parse(data);
    }

    static saveJSONdata(newData) {
        const filePath = path.join(__dirname, "data/events.json");
        const newEvent = JSON.stringify(newData)
        fs.writeFileSync(filePath, newEvent);
    }
}