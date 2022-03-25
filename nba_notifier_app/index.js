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

    // Heading of the Page displaying the city chosen
    const headerElem = document.createElement("h1");
    headerElem.innerHTML = data.timezone;
    divElem.appendChild(headerElem);

    // Current Weather Data
    const titleCurrent = document.createElement("h2");
    titleCurrent.innerHTML = "Current Weather Data";
    divElem.appendChild(titleCurrent);

    const ulTagCurrent = document.createElement("ul");
    const currentObj = current;
    const liTag = document.createElement("li");
    let date = new Date(0);
    // I have to set it as such otherwise sets 01.01.1970 date and time 
    date.setUTCSeconds(currentObj.dt);
    let dateString = "Date: "+date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();

    liTag.textContent = `${dateString}; Temperature: ${currentObj.temp}, Feels Like Temperature: ${currentObj.feels_like}`;
    ulTagCurrent.appendChild(liTag);
    divElem.appendChild(ulTagCurrent);

    // Daily Data Weather Forecast
    const titleDaily = document.createElement("h2");
    titleDaily.innerHTML = "Daily Weather Forecast Data";
    divElem.appendChild(titleDaily);

    const ulTagDaily = document.createElement("ul");
    for (let i = 0; i < daily_data.length; i++) {
        const currentObj = daily_data[i];
        const liTag = document.createElement("li");
        let date = new Date(0);
        // I have to set it as such otherwise sets 01.01.1970 date and time 
        date.setUTCSeconds(currentObj.dt);
        let dateString = "Date: "+date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();

        liTag.textContent = `${dateString}; Temperature: day = ${currentObj.temp.day}, evening = ${currentObj.temp.eve}, min = ${currentObj.temp.min}, max = ${currentObj.temp.max}, night: ${currentObj.temp.day}`;
        ulTagDaily.appendChild(liTag);
        divElem.appendChild(ulTagDaily);
    }

    // Hourly Data Weather Forecast 
    const titleHourly = document.createElement("h2");
    titleHourly.innerHTML = "Hourly Weather Forecast Data";
    divElem.appendChild(titleHourly);

    const ulTagHourly = document.createElement("ul");
    for (let i = 0; i < hourly_data.length; i++) {
        const currentObj = hourly_data[i];
        const liTag = document.createElement("li");
        let date = new Date(0);
        // I have to set it as such otherwise sets 01.01.1970 date and time 
        date.setUTCSeconds(currentObj.dt);
        let dateString = "Date: "+date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()+" "+date.getHours()+":"+date.getMinutes()+"0";

        liTag.textContent = `${dateString}; Temperature: ${currentObj.temp}`;
        ulTagHourly.appendChild(liTag);
        divElem.appendChild(ulTagHourly);
    }
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