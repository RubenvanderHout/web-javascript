// Components
import "./components/loadinghall/webcomponent.js"
// Services
import { getForcast, searchLocation } from "./services/weatherservice.js";
// Modules
import Hall from  "./modules/hall.js"

// Forcast 
let forcast = null 
// Halls

const hallElements = document.getElementsByTagName("hall-component");
let halls = [];
/** @type {null | Hall} */
let currentHall = null;

for (let index = 0; index < hallElements.length; index++) {
    halls[index] = new Hall(hallElements[index]);
}
currentHall = halls[0]; // Set the current hall to the first one


// Hall links
const hallSwitchLinks = document.querySelectorAll("div.links a")

hallSwitchLinks.forEach( (link) => {
    link.addEventListener("click", () => {
        const id = link.id.split("-").pop();
        toggleHall(id);
    })
})

function toggleHall(id) {

    let hallId = "hall-" + id
    let nextHall = document.getElementById(hallId);
    let hallAlreadyShown = !nextHall.classList.contains("hide");

    if(hallAlreadyShown) {
        return;
    }
    currentHall.hallElement.classList.add("hide");
    nextHall.classList.remove('hide');
    currentHall = halls[id - 1];
}

// Trucks

const newTruckForm = document.getElementById("createTruck");

newTruckForm.addEventListener("submit", (event) => {  
    event.preventDefault(); 
    currentHall.addNewTruck(newTruckForm) 
})


// Weather

const locationForm = document.getElementById("getLocation");

locationForm.addEventListener("submit", async (event) => {  
    event.preventDefault(); 
    // @ts-ignore
    const formData = new FormData(locationForm);

    const cityName = formData.get("city");
    const locations = await searchLocation(cityName)
    const firstLocation = locations.results[0];

    forcast = await getForcast(firstLocation.latitude, firstLocation.longitude);
    bindForCastToComponents(forcast);
})

function bindForCastToComponents(forcast){
    for (const element of hallElements) {
        // @ts-ignore
        element.setWeatherData(forcast);
    }
}


const hotButton = document.getElementById("hotButton")
hotButton.addEventListener("click", () => {
    TooHot();
})

function TooHot(){
    const weatherData = {
        "latitude": 52.52,
        "longitude": 13.419998,
        "generationtime_ms": 0.04303455352783203,
        "utc_offset_seconds": 0,
        "timezone": "GMT",
        "timezone_abbreviation": "GMT",
        "elevation": 38.0,
        "current_units": {
            "time": "iso8601",
            "interval": "seconds",
            "temperature_2m": "°C",
            "precipitation": "mm",
            "wind_speed_10m": "km/h"
        },
        "current": {
            "time": "2024-03-31T14:15",
            "interval": 900,
            "temperature_2m": 35,
            "precipitation": 0.00,
            "wind_speed_10m": 1,
        }
    };
    bindForCastToComponents(weatherData);
}

const precipitationButton = document.getElementById("precipitationButton");
precipitationButton.addEventListener("click", () => {
    TooMuchPrecipitation();
})

function TooMuchPrecipitation(){
    const weatherData = {
        "latitude": 52.52,
        "longitude": 13.419998,
        "generationtime_ms": 0.04303455352783203,
        "utc_offset_seconds": 0,
        "timezone": "GMT",
        "timezone_abbreviation": "GMT",
        "elevation": 38.0,
        "current_units": {
            "time": "iso8601",
            "interval": "seconds",
            "temperature_2m": "°C",
            "precipitation": "mm",
            "wind_speed_10m": "km/h"
        },
        "current": {
            "time": "2024-03-31T14:15",
            "interval": 900,
            "temperature_2m": 10,
            "precipitation": 10.0,
            "wind_speed_10m": 1,
        }
    };
    bindForCastToComponents(weatherData);
}

const windButton = document.getElementById("windButton");
windButton.addEventListener("click", () => {
    TooMuchWind();
})


function TooMuchWind(){
    const weatherData = {
        "latitude": 52.52,
        "longitude": 13.419998,
        "generationtime_ms": 0.04303455352783203,
        "utc_offset_seconds": 0,
        "timezone": "GMT",
        "timezone_abbreviation": "GMT",
        "elevation": 38.0,
        "current_units": {
            "time": "iso8601",
            "interval": "seconds",
            "temperature_2m": "°C",
            "precipitation": "mm",
            "wind_speed_10m": "km/h"
        },
        "current": {
            "time": "2024-03-31T14:15",
            "interval": 900,
            "temperature_2m": 5,
            "precipitation": 0.00,
            "wind_speed_10m": 100,
        }
    };
    bindForCastToComponents(weatherData);
}
