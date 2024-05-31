const express = require('express');
const app = express();
const port = 3000;


//! Lista delle rotte 

app.get("/", (req, res) => {
    console.log("sei entrato nella home");
    res.send("<h1>Benvenuto nell'Event Manager</h1>")
})

app.listen(port, () => {
    console.log(`Server avviato alla porta http://localhost:${port}`)
})