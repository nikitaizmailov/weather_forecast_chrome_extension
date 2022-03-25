// A popup is the small window displayed when a user clicks the toolbar icon in the browser interface. It is an HTML file that can include other resources such as stylesheets and scripts, but inline scripts are not allowed.

// Initialize button with user's preferred color
// let changeColor = document.getElementById("changeColor");

// chrome.storage.sync.get("color", ({ color }) => {
//   changeColor.style.backgroundColor = color;
// });

// // When the button is clicked, inject setPageBackgroundColor into current page
// changeColor.addEventListener("click", async () => {
//     let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
//     chrome.scripting.executeScript({
//       target: { tabId: tab.id },
//       function: setPageBackgroundColor,
//     });
//   });
  
//   // The body of this function will be executed as a content script inside the
//   // current page
//   function setPageBackgroundColor() {
//     chrome.storage.sync.get("color", ({ color }) => {
//       document.body.style.backgroundColor = color;
//     });
//   }

// Adding Weather Forecast Functionality:
// Adding change City event
const inputCity = document.getElementById("js-input-city");
const buttonCity = document.querySelector(".input-button");
const form = document.getElementById("js-form");
const message = document.getElementById("js-message");

// buttonCity.addEventListener("click", updateCity);



// adding communications between the files/modules
// When the button is pressed
function updateCity(event) {
    event.preventDefault();

    const cityInputted = inputCity.value;

    // if no value provided i.e. the input field is empty don't do anything.
    if (!cityInputted) return;

    // Sending the requst to change the city and new weather forecast in chrome.storage.local
    chrome.runtime.sendMessage({ command: 'next-city', city: cityInputted}, function (response) {
        console.log(response.message);
    })

    message.textContent = "Loading...";

    setTimeout(() => {
      message.textContent = "City loaded successfully!";
    }, 1000);

    // Clear the input after the use;
    inputCity.value = "";

}

buttonCity.addEventListener("click", updateCity);