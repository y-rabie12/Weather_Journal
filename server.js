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

// Callback to debug
function sayHello()
{
    console.log(`Hello world, I am listening on ${port}`);
}
// Initialize all route with a callback function

// Callback function to complete GET '/all'
weatherApp.get('/all',function (request,response)
{
   response.send(weatherData);
})

// Post Route
weatherApp.post('/all',function(request,response)
{
    weatherData.Temperature = request.body.temperature;
    weatherData.Date = request.body.date;
    weatherData.userResponse = request.body.userResponse;
    response.send(weatherData);
})