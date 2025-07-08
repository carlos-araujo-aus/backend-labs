const axios = require('axios'); // For Node.js, or include via CDN for browser

// Asynchronous function to post data to an API
async function postData() {
  try {
    // Await the response from the Axios POST request
    let response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
      title: 'foo', // The title of the post
      body: 'bar',  // The body/content of the post
      userId: 1     // The user ID associated with the post
    });

    // Log the response data to the console
    console.log(response.data); 
  } catch (error) {
    // If there is an error, log the error message to the console
    console.error('Error posting data:', error); 
  }
}

// Call the async function to execute the request
postData();