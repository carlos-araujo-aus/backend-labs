let myPromise = new Promise((resolve,reject) => {
    setTimeout(() => {
        resolve("First Promise resolved")
    },3000)
})

console.log("Before calling the promises")

myPromise.then((successMessage) => {
    console.log("From Callback: " + successMessage)

    let myPromise2 = new Promise((resolveSecond,rejectSecond) => {
        setTimeout(() => {
            resolveSecond("Second Promise Resolved")       
        }, 2000);
    })
    
    myPromise2.then((successMessage2) => {
        console.log("From Callback 2: " + successMessage2)
    })
})


