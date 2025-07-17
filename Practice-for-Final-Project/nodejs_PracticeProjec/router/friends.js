const express = require('express');

const router = express.Router();

let friends = {
    "johnsmith@gamil.com": {
      "firstName": "John",
      "lastName": "Doe",
      "DOB":"22-12-1990"
    },
    "annasmith@gamil.com":{
      "firstName": "Anna",
      "lastName": "smith",
      "DOB":"02-07-1983"
    },
    "peterjones@gamil.com":{
      "firstName": "Peter"
      ,"lastName": "Jones"
      ,"DOB":"21-03-1989"
    },
    "carlosaraujo07@gmail.com" :{
      "firstName": "Carlos",
      "lastName": "Araujo",
      "DOB":"04-03-1988"
    }
};


// GET request: Retrieve all friends
router.get("/",(req,res)=>{
  // Send JSON response with formatted friends data
  res.send(JSON.stringify(friends,null,4));
});

// GET by specific ID request: Retrieve a single friend with email ID
router.get("/:email",(req,res)=>{
  // Retrieve the email parameter from the request URL and send the corresponding friend's details
  const email = req.params.email;
  res.send("The requested friend with email " + email + " is " + JSON.stringify(friends[email],null,4));
});


// POST request: Add a new friend
router.post("/",(req,res)=>{
  // Check if email is provided in the request body
  if (!req.body.email){
    return res.status(400).json({message: "Email is required"});
  }
  // Check if friend with email already exists
  if (friends[req.body.email]){
    return res.status(400).json({message: "Friend with email " + req.body.email + " already exists"});
  }
  // Add the new friend to the friends object
  if (req.body.email) {
    friends[req.body.email] = {
      "firstName": req.body.firstName,
      "lastName": req.body.lastName,
      "DOB": req.body.DOB
    };
    res.send("The friend with email " + req.body.email + " has been added successfully");
  }  
});


// PUT request: Update the details of a friend with email id
router.put("/:email", (req, res) => {
  const email = req.params.email;
  // Check if friend with email exists
  if (!friends[email]){
    return res.status(404).json({message: "Friend with email " + email + " not found"});
  }
  // Update the friend's details if provided
  if (req.body.DOB) {
    friends[email].DOB = req.body.DOB;
  }
  if (req.body.firstName) {
    friends[email].firstName = req.body.firstName;
  }
  if (req.body.lastName) {
    friends[email].lastName = req.body.lastName;
  }
  if (req.body.email) {
    friends[email].email = req.body.email;
  }

  // Send a success message
    res.send("The friend with email " + email + " has been updated successfully"); 
});


// DELETE request: Delete a friend by email id
router.delete("/:email", (req, res) => {
  const email = req.params.email;

  // Check if the friend with the specified email exists
  if (friends[email]){
    delete friends[email];  
    res.send("The friend with email " + email + " has been deleted successfully");
  }
  // If the friend with the specified email does not exist, send an error message
  else {
    res.send("The friend with email " + email + " not found");
  }
});

module.exports=router;
