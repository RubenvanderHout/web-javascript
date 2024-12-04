import { reactive } from "../utils/utils.js";

const WeatherData = {
    WEATHER_API_URL : "https://api.open-meteo.com/v1/forecast",
    WEATHER_API_PART : "&current=temperature_2m,precipitation",
    GEOCODING_API_URL : "https://geocoding-api.open-meteo.com/v1/search"
}

export const currentWeatherInfo = reactive({});

export function getInitialLocation(){
    if(!navigator.geolocation){
        console.log("Geolocation is not supported")
    }

    function setCurrentLocation(pos){
        const longitude = pos.coords.longitude;
        const latitude = pos.coords.latitude;

        currentWeatherInfo.name = "Not found";
        currentWeatherInfo.longitude = longitude;
        currentWeatherInfo.latitude = latitude;

        getForecast(longitude, latitude).then((result) => {
            currentWeatherInfo.temperature = result.temperature_2m;
            currentWeatherInfo.precipitation = result.precipitation;
        });


        currentWeatherInfo.temperature = "Not found"
    };

    navigator.geolocation.getCurrentPosition(setCurrentLocation);
}

export function setCurrentLocation(result) {

    console.log(result)
    const longitude = result.longitude;
    const latitude = result.latitude;

    currentWeatherInfo.name = result.name;
    currentWeatherInfo.longitude = longitude
    currentWeatherInfo.latitude = latitude


    getForecast(longitude, latitude).then((result) => {
        console.log(result)
        currentWeatherInfo.temperature = result.temperature_2m;
        currentWeatherInfo.precipitation = result.precipitation;
    });
}


/**
 * @param {number} longitude
 * @param {number} latitude
 */
export async function getForecast(longitude, latitude) {

    let url = WeatherData.WEATHER_API_URL;
    url += `?latitude=${latitude}&longitude=${longitude}` + WeatherData.WEATHER_API_PART;

    try {
        const response = await fetch(url)
        const weather = await response.json();
        return weather.current;
    } catch (error) {
        console.log(`Could not return forcaset because: ${error}`)
    }
}

/**
 * @param {string} cityName
 */
export async function searchLocations(cityName) {
    const url = WeatherData.GEOCODING_API_URL + `?name=${cityName}`;

    try {
        const response = await fetch(url);
        const tmp = await response.json();
        const location = tmp.results;
        return location;
    } catch (error) {
        console.log(`Could not return Location because: ${error}`)
    }
}


export function getWeatherMixingModifiers(currentWeatherInfo) {

    function calculateMixingSpeedModifier(weather) {
        let modifier = 1;
        if (weather?.precipitation > 0) modifier *= 1.10; // Increase for precipitation
        if (weather?.temperature < 10) modifier *= 1.15; // Increase for cold weather
        return modifier;
    };

    function calculateOtherModifiers (weather) {
        const modifiers = {};
        if (weather?.temperature > 35) modifiers.maxmachines = 1; // Limit machines
        return modifiers;
    };

    return {
        mixingspeedmodifier: calculateMixingSpeedModifier(currentWeatherInfo),
        ...calculateOtherModifiers(currentWeatherInfo),
    };
}
