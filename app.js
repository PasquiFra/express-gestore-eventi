const express = require('express');
const app = express();
const port = 3000;

//! Import dei routers - middlewares - controllers
const eventRouter = require("./routers/events");
const errorsLogger = require("./middlewares/errorsLogger");
const routeNotFound = require("./middlewares/routeNotFound");

//import del modulo per leggere il body della request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//! Lista delle rotte 
// Rotta Home
app.get("/", (req, res) => {
    console.log("sei entrato nella home");
    res.send("<h1>Benvenuto nell'Event Manager</h1>")
})

app.use("/events", eventRouter);

// Se la rotta richiesta non è settata restituisco un errore 
app.use(routeNotFound);
//import del middleware che si occupa di dare un feedback sugli errori
app.use(errorsLogger);


app.listen(port, () => {
    console.log(`Server avviato alla porta http://localhost:${port}`);
})