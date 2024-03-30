class WeatherData {
    static WEATHER_API_URL = "https://api.open-meteo.com/v1/forecast" 
    static WEATHER_API_PART = "&current=temperature_2m,rain,snowfall"
    static GEOCODING_API_URL = "https://geocoding-api.open-meteo.com/v1/search"
}

async function getForcast(longitude, latitude) {
    if (typeof longitude !== 'string' && typeof latitude !== 'string' ){
        throw new Error("Only accept string for longitude and latitude");
    }

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

async function searchLocation(cityName) {
    if (typeof cityName !== 'string'){
        throw new Error("Only accept string for cityname");
    }

    const url = WeatherData.GEOCODING_API_URL + `?name=${cityName}`;

    try {
        const response = await fetch(url);
        const location = await response.json();
        return location;
    } catch (error) {
        console.log(`Could not return Location because: ${error}`)
    }
}
