const express = require('express');
const router = express.Router();
const moment = require('moment');

let users = [
    {
        id: 1,
        firstName: "John",
        lastName: "wick",
        email:"johnwick@gamil.com",
        DOB:"22-01-1990",
    },
    {
        id: 2,
        firstName: "John",
        lastName: "smith",
        email:"johnsmith@gamil.com",
        DOB:"21-07-1983",
    },
    {
        id: 3,
        firstName: "Joyal",
        lastName: "white",
        email:"joyalwhite@gamil.com",
        DOB:"21-03-1989",
    },
];

// GET request: Retrieve all users
router.get("/",(req,res)=>{  
  res.send(JSON.stringify({users}, null, 4))
});

// GET by specific email request: Retrieve a single user with email ID
router.get("/email/:email",(req,res)=>{
  // Extract the email parameter from the request URL
  const email = req.params.email;
  // Filter the users array to find users whose email matches the extracted email parameter
  let filtered_users = users.filter((user) => user.email === email);
  // Send the filtered_users array as the response to the client
  res.send(filtered_users);//This line is to be replaced with actual return value
});

// GET by specific lastName request: Retrieve a single user with lastName
router.get("/lastName/:lastName",(req,res)=>{
  // Extract the lastName parameter from the request URL
  const lastName = req.params.lastName
  // Filter the users array to find users whose lastName matches the extracted lastName parameter
  let filtered_users = users.filter((user) => user.lastName === lastName)
  // Send the filtered_users array as the response to the client
  res.send(filtered_users)
})

router.get("/sort", (req,res)=>{
  const userFormatted = users.map((user)=>{
    return {
      ...user,
      DOB: moment(user.DOB, 'DD-MM-YYYY').format('YYYY-MM-DD')
    }
  })
  const sorted_users = userFormatted.sort((a,b)=> a.DOB.localeCompare(b.DOB))  
  res.send(sorted_users)
})

// POST request: Create a new user
router.post("/",(req,res)=>{
  // Push a new user object into the users array based on query parameters from the request
  users.push({
    id: users.length + 1,
    firstName: req.query.firstName,
    lastName: req.query.lastName,  
    email: req.query.email,
    DOB: req.query.DOB
  })
  // Send a response indicating that the user has been added  
  res.send("The user " + req.query.firstName + "has been added!")//This line is to be replaced with actual return value
});


// PUT request: Update the details of a user by email ID
router.put("/:email", (req, res) => {

  console.log("original array: ", users)

  // Extract email parameter and find users with matching email
  const email = req.params.email
  let filtered_users = users.filter((user) => user.email === email)

  console.log("filtered array: ", filtered_users)

  if (filtered_users.length > 0) {
    // Select the first matching user and update attributes if provided
    let filtered_user = filtered_users[0]
    // Extract and update DOB if provided
    let newDOB = req.query.DOB
    let newEmail = req.query.email
    let newFirstName = req.query.firstName
    let newLastName = req.query.lastName

    
    if (newDOB) {
      filtered_user.DOB = newDOB
    }
    if (newEmail) {
      filtered_user.email = newEmail
    }
    if (newFirstName) {
      filtered_user.firstName = newFirstName
    }
    if (newLastName) {
      filtered_user.lastName = newLastName
    }
    
    console.log("User modified: ", filtered_user)

    users = users.filter((user) => user.email !== email)
    users.push(filtered_user)

    console.log("Updated array: ", users)

    res.send(`User with the ID ${filtered_user.id} updated successfully`)
  } 
  else {
    res.send("Unable to find user")
  }
});


// DELETE request: Delete a user by email ID
router.delete("/:email", (req, res) => {

  console.log("original array: ", users)

    // Extract the email parameter from the request URL
  const email = req.params.email

  // Filter the users array to find users with matching email
  let filtered_users = users.filter((user) => user.email === email)

  console.log("filtered array: ", filtered_users)

  // Check if any users were found with the matching email
  if (filtered_users.length > 0) {
    // Filter out the user with the matching email from the users array
    users = users.filter((user) => user.email !== email)
    // Send a response indicating that the user has been deleted
    res.send(`User with the email ${email} deleted successfully`)

    console.log("Updated array: ", users)

  }
  else {
    res.send("Unable to find user")
  }
});

module.exports=router;
