 // Importing required modules: Express.js, JSON Web Token (JWT), and Express session
const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');

let users = [];

// Function to check if the user exists
const doesExist = (username) => {
  let userswithsamename = users.filter((user) => {
    return user.username === username;
  });
  return userswithsamename.length > 0;
};

// Function to check if the user is authenticated
const authenticatedUser = (username, password) => {
  let validusers = users.filter((user) => {
    return user.username === username && user.password === password;
  });
  return validusers.length > 0;
};

// Create an instance of Express
const app = express();

// Define the port number
const PORT = 5000; 

// Middleware to parse JSON request bodies
app.use(express.json()); 

// Middleware to handle sessions
app.use(session({ 
  secret: "fingerpint", 
  resave: true, 
  saveUninitialized: true 
})); 

// Route to handle user login
app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(404).json({ message: "Error logging in" });
  }

  if (authenticatedUser(username, password)) {
    let accessToken = jwt.sign({
      data: password
    }, 'access', { expiresIn: 60 * 60 });
    
    req.session.authorization = {
      accessToken: accessToken,
      username: username
    };
    return res.status(200).send("User successfully logged in");
  } else {
    return res.status(208).json({ message: "Invalid Login. Check username and password" });
  }
});

// Middleware to authenticate users using JWT
app.use("/auth", function auth(req, res, next) {
  // Get the authorization object stored in the session
  if (req.session.authorization) {
    // Retrieve the token from authorization object
    token = req.session.authorization['accessToken']; 
    // Use JWT to verify token
    jwt.verify(token, "access", (err, user) => { 
      if (!err) {
        req.user = user;
        next();
      } else {
        return res.status(403).json({ message: "User not authenticated" });
      }
    });
  } else {
    return res.status(403).json({ message: "User not logged in" });
  }
});


// Route to handle user registration
app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!doesExist(username)) {
      users.push({ "username": username, "password": password });
      return res.status(200).json({ message: "User successfully registered. Now you can login" });
    } else {
      return res.status(404).json({ message: "User already exists!" });
    }
  }
  return res.status(404).json({ message: "Unable to register user." });
});

// Main endpoint to be accessed by authenticated users
app.get("/auth/get_message", (req, res) => {
  return res.status(200).json({ message: "Hello, You are an authenticated user. Congratulations!" });
});


// Start the server and listen on the specified port
app.listen(PORT, () => console.log("Server is running")); 
