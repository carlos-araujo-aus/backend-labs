// Import the axios library.

const axios = require('axios');

// Data to be sent in the POST request. This is a JavaScript object containing the user information.
const data = {
  name: 'John Doe',
  age: 30
};

// Using the axios.post method to make a POST request to the specified URL with the data object.
axios.post('https://api.example.com/users', data)
  
// If the request is successful, the `.then` block is executed.
  .then(response => {
    
// The response object contains the data returned from the server.
// We log a message along with the `data` property of the response to the console.
    
    console.log('User created:', response.data);
  })
  // If there is an error during the request, the `.catch` block is executed.
  
    .catch(error => {
    // We log an error message to the console along with the error object.
    // This helps in debugging and understanding what went wrong with the request.
    
    console.error('Error creating user:', error);
  });