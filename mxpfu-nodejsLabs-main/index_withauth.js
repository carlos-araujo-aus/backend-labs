// Import Express, user routes, and JWT, create an instance of Express
const express = require('express');
const routes = require('./routes/users.js');
const jwt = require('jsonwebtoken');
const session = require('express-session');

// Create an instance of Express
const app = express();

// Set the port number
const PORT = 5000;

// Initialize session middleware with options to store user sessions
app.use(session({ 
    secret: "fingerprint", 
    resave: true, 
    saveUninitialized: true 
}));

// Parse JSON request bodies
app.use(express.json());

// Login endpoint, generate JWT access token and store in session, create user authentication 
app.post("/login", (req, res) => {
    const user = req.body.user;
    if (!user) {
        return res.status(400).json({ message: "Username is required" });
    }
    // Generate JWT access token
    let accessToken = jwt.sign({
        data: user
    }, 'access', { expiresIn: 60 * 60 });

    // Store access token in session
    req.session.authorization = {
        accessToken
    }
    return res.status(200).json({ message: "Login successful" });
});

// Middleware for user authentication
app.use("/user", (req, res, next) => {
    // Check if user is authenticated
    if (req.session.authorization) {
        // Get the access token from the session
        let token = req.session.authorization.accessToken; 
        
        // Verify JWT token for user authentication
        jwt.verify(token, "access", (err, user) => {
            if (!err) {
                req.user = user; // Set authenticated user data on the request object
                next(); // Proceed to the next middleware
            } else {
                return res.status(403).json({ message: "User not authenticated" }); // Return error if token verification fails
            }
        });
        
        // Return error if no access token is found in the session
    } else {
        return res.status(403).json({ message: "User not logged in" });
    }
});


// User routes
app.use("/user", routes);


// Start server
app.listen(PORT, () => console.log("Server is running at port " + PORT));
