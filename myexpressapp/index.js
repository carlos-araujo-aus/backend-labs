const express = require("express");
const app = express();
const port = 8080;

app.get("/", (req, res) => {
    res.send("Hello World");
});

let server = app.listen(port, () => {
    console.log("Listening at http://localhost:" + port);
})