function setWeatherData(data) {
    const divElem = document.querySelector(".rootDiv");

    // arrays of objects
    const daily_data = data.daily;
    const hourly_data = data.hourly;
    const current = data.current;

    // for of loop to loop

    // for (let elem in daily_data) {
    //     const textP = document.createElement("p");
    //     const temperatureObject = elem.temp;
    //     textP.textContent = `Time: ${elem.dt}, TempObject: ${temperatureObject}`;
    //     // added the element to the Div structure.
    //     divElem.appendChild(textP);
    // }

    // Current Weather Data
    const titleCurrent = document.createElement("h2");
    titleCurrent.innerHTML = "Current Weather Data";

    // Daily Data Weather Forecast
    const titleDaily = document.createElement("h2");
    titleDaily.innerHTML = "Daily Weather Forecast Data";

    const ulTag = document.createElement("ul");
    for (let i = 0; i < daily_data.length; i++) {
        const currentObj = daily_data[i];
        const liTag = document.createElement("li");
        let date = new Date(0);
        // I have to set it as such otherwise sets 01.01.1970 date and time 
        date.setUTCSeconds(currentObj.dt);
        let dateString = "Date: "+date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();

        liTag.textContent = `${dateString}; Temperature: day = ${currentObj.temp.day}, evening = ${currentObj.temp.eve}, min = ${currentObj.temp.min}, max = ${currentObj.temp.max}, night: ${currentObj.temp.day}`;
        ulTag.appendChild(liTag);
        divElem.appendChild(ulTag);
    }

    // Hourly Data Weather Forecast 
    const titleHourly = document.createElement("h2");
    titleHourly.innerHTML = "Hourly Weather Forecast Data";
}

// Once the DOM is loaded and parsed, the data stored in the chrome.storage.local object get retrieved and execite
document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.local.get("weatherForecast", data => {
        // checking if we have such key val pair in map object
        if (data.weatherForecast) {
            setWeatherData(data.weatherForecast);
        }        
    })
});