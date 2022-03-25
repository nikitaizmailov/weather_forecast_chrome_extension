import fetch from 'node-fetch';

const api_key = "98f8067d644e5ec5c2bc7cba5705b39d";

const api_key_hourly_data = "f0c8b7f1b984af4a4155a856d3876334";

const limit = 5;

// converting city name into a geolocation coords to feed into openweather api
let cityName = "London";

// Using Fetch API provides a JavaScript interface for accessing and manipulating parts of the HTTP pipeline, such as requests and responses. It also provides a global fetch() method that provides an easy, logical way to fetch resources asynchronously across the network.

async function fetchGeoLocation(api_key, limit, cityName) {
    const endpoint = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=${limit}&appid=${api_key}`;

    const response = await fetch(endpoint);

    // Lets catch a 404 or bad HTTP status when page does not exist on a server
    // response.ok = True or False
    if (!response.ok) {
        const message = `An error has occured: ${response.status} code`;
        throw new Error(message);
    }

    // Hence here Promise is resolved into Response object.
    // i.e. no rejection. So all good.
    const geoLocationJson = await response.json();
    return geoLocationJson;
}

// Hence if you run the function and try to console.log(return object) you get Promise { <pending> }, meaning that the operation has not been completed yet, hence why you need to use .this() method after.

let geoLocationCity = await fetchGeoLocation(api_key, limit, cityName).then((x) => {
    // returned is an array of objects. hence grabbing 0idx object
    let lat = x[0].lat;
    let lon = x[0].lon;
    return [lat, lon];
    }).catch(error => {
        console.log(error.message);
    });

console.log(geoLocationCity)

// Making a Javascript Get http request to recieve weather data
// in this API response recieve: hourly forecast for 48 hours
// Daily forecast for 7 days
// Current Weather
// The timestamp is saved as Epoch Unix Timestamp
async function fetchWeatherForecast(api_key, geoLocationCity) {
    const lat = geoLocationCity[0];
    const lon = geoLocationCity[1];
    const endpoint = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&appid=${api_key}&units=metric`;

    const response = await fetch(endpoint);

    // Lets catch a 404 or bad HTTP status when page does not exist on a server
    // response.ok = True or False
    if (!response.ok) {
        const message = `An error has occured: ${response.status} code`;
        throw new Error(message);
    }

    // Hence here Promise is resolved into Response object.
    // i.e. no rejection. So all good.
    const weather = await response.json();
    return weather;
}

let weatherToday = await fetchWeatherForecast(api_key_hourly_data, geoLocationCity).then((x) => {
    // returned is an array of objects. hence grabbing 0idx object
    return x;
    }).catch(error => {
        console.log(error.message);
    });

console.log(weatherToday);

// Storing the data to be used by other javacsript modules in Chrome Extension
