const WeatherData = {
    WEATHER_API_URL : "https://api.open-meteo.com/v1/forecast",
    WEATHER_API_PART : "&current=temperature_2m,precipitation",
    GEOCODING_API_URL : "https://geocoding-api.open-meteo.com/v1/search"
}

/**
 * @param {number} longitude
 * @param {number} latitude
 */
export async function getForcast(longitude, latitude) {
    let url = WeatherData.WEATHER_API_URL;
    url += `?latitude=${longitude}&longitude=${latitude}` + WeatherData.WEATHER_API_PART;

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
export async function searchLocation(cityName) {
    const url = WeatherData.GEOCODING_API_URL + `?name=${cityName}`;

    try {
        const response = await fetch(url);
        const location = await response.json();
        return location;
    } catch (error) {
        console.log(`Could not return Location because: ${error}`)
    }
}
