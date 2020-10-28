// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// Personal API Key for OpenWeatherMap API
const weatherKey = '4197a23cddf93865680f5759c4c61f15';

// Event listener to add function to existing HTML DOM element
let generateButton = document.querySelector('#generate');

/* Function called by event listener */
generateButton.addEventListener('click', performAction)

function performAction(e) {
    const zipCode = document.querySelector('#zip').value;
    const userContent = document.querySelector('#content').value;
    requestData(weatherKey, zipCode)
        .then(function (weatherData) {
            postWeatherData('http://localhost:8080/all', { Temperature: weatherData.main.temp, Date: newDate, feelings: userContent })

        })
}

/* Function to GET Web API Data*/
const requestData = async (weatherKey, zipCode) => {
    const fullUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + zipCode + "&APPID=" + weatherKey;
    const response = await fetch(fullUrl);
    try {
        const weatherData = await response.json();
        console.log(weatherData);
        return weatherData;
    }
    catch
    {
        console.log("Error, API call has never taken place")
    }
}
/* Function to POST data */
const postWeatherData = async (url, weatherData) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        // Body data type must match "Content-Type" header        
        body: JSON.stringify(weatherData),
    });

    try {
        const newWeatherData = await response.json();
        console.log(newWeatherData);
        return newWeatherData;
    }
    catch (error) {
        console.log("error", error);
    }
}

