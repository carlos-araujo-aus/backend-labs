// Execute the promise and handle the fulfilled and rejected states
myPromise

  // Handle the resolved state of the promise
  .then((message) => { 
    // This block will execute if the promise is resolved
    console.log(message); // "The operation was successful!"
  }) 

  // Handle the rejected state of the promise
  .catch((error) => { 
    // This block will execute if the promise is rejected
    console.error(error); // "The operation failed!"
  });