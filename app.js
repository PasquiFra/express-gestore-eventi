const express = require('express');
const app = express();
const port = 3000;

//! Import dei routers - middlewares - controllers
const eventRouter = require("./routers/events");

//! Lista delle rotte 
// Rotta Home
app.get("/", (req, res) => {
    console.log("sei entrato nella home");
    res.send("<h1>Benvenuto nell'Event Manager</h1>")
})

app.use("/events", eventRouter);

app.listen(port, () => {
    console.log(`Server avviato alla porta http://localhost:${port}`);
})