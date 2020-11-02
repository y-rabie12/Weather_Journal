// Setup empty JS object to act as endpoint for all routes
let weatherData = {};

// Express to run server and routes
const express = require('express');

// Start up an instance of app/
const weatherApp = express();
/* Dependencies */
const bodyParser = require('body-parser');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
weatherApp.use(bodyParser.urlencoded({extended: false}));
weatherApp.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require('cors');
weatherApp.use(cors());
// Initialize the main project folder
weatherApp.use(express.static('website'));

// Spin up the server
const port = 8080
weatherApp.listen(port, sayHello)

// This ensures that the server is working properly
function sayHello()
{
    console.log(`Hello world, I am listening on ${port}`);
}

// This is the GET route where the path is '/all'
weatherApp.get('/all',function (request,response)
{
   response.send(weatherData);
})

// This is a POST route that posts weather Data to using the specified route.
weatherApp.post('/',function(request,response)
{
    // The first key-value pair; that stores the temperature
    weatherData.Temperature = request.body.temp;
    // The second key-value pair; that stores the date
    weatherData.Date = request.body.date;
    // The third key-value pair; that store the user feelings or response
    weatherData.userResponse = request.body.userResponse;
    response.send(weatherData);
})