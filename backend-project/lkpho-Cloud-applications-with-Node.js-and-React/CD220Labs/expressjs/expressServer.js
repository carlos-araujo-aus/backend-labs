 // Import the Express.js library
const express = require('express');

// Create an instance of an Express application
const app = new express();

// Initialize an array to store login details
let loginDetails = [];
let months = {"January":1, "February":2, "March":3, "April":4, "May":5, "June":6, "July":7, "August":8, "September":9, "October":10, "November":11, "December":12};

// Define the root route to send a welcome message
app.get("/", (req, res) => {
    res.send("Welcome to the express server");
});

// Define a route to send login details as a JSON string
app.get("/loginDetails", (req, res) => {
    res.send(JSON.stringify(loginDetails));
});

// Define a route to handle login requests and store login details
app.post("/login/:name", (req, res) => {
    loginDetails.push({ "name": req.params.name, "login_time": new Date() });
    res.send(req.params.name + ", You are logged in!");
});

// Define a dynamic route to greet users by name
app.get("/name/:name", (req, res) => {
    res.send("Hello " + req.params.name);
});

app.get("/fetchMonth", (req,res) =>{
    res.send(months);
})

// Define a dynamic route to fetch the month by number
app.get("/fetchMonth/:num", (req,res) =>{
    // Define an array of months
    const month = {1:"January", 2:"February", 3:"March", 4:"April", 5:"May", 6:"June", 7:"July", 8:"August", 9:"September", 10:"October", 11:"November", 12:"December"};
    // Get the number from the request parameters
    const num = parseInt(req.params.num)
    // Check if the number is valid
    if(num < 1 || num > 12){
        res.send("Invalid month number");
    } else {
        res.send("The month is: " + month[num]);
    }
})

// Define a dynamic route to greet users by name (MUST be last - catch-all route)
app.get("/:name", (req, res) => {
    res.send("Hello " + req.params.name);
});

// Start the server and listen on port 3333
app.listen(3333, () => {
    console.log(`Listening at http://localhost:3333`);
});
