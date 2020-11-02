

// This is the API key acquired from OpenWeatherMap.
const weatherKey = '4197a23cddf93865680f5759c4c61f15';
// Event Listener is added to the button so that once the button is clicked, a function will be executed.
let generateButton = document.querySelector('#generate'); 
generateButton.addEventListener('click', performAction) 
// This function is executed once the button is clicked.
function performAction(e) {
    // This creates a new Date object, with a variable newDate stores the date.
    let d = new Date();
    let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

    // Stores the value of the postal code, once the user enters a zip code.
    const zipCode = document.querySelector('#zip').value;
    // Stores the content or the feelings the user has written in the textarea.
    const userContent = document.querySelector('#feelings').value;
    // The function requestData retrieves the weather informtation using the API weatherKey and the zipcode.
    requestData(weatherKey, zipCode)
        .then(function (weatherData) {
            postWeatherData('http://localhost:8080', { Temperature: weatherData.main.temp, Date: newDate, feelings: userContent })

        })
}

// This function retrieves the weatherData from Open Weather Map.
const requestData = async (weatherKey, zipCode) => {
    // This variable stores the full URL that the request is made to.
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
// This function is made to post the weather data to the '/all' route. It takes the url and an object 'weatherData'
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
        console.log(weatherData);
        return weatherData;
    }
    catch (error) {
        console.log("error", error);
    }
}



