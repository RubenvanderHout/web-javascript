import { getForecast } from "../services/weatherservice.js"; 

export async function getWeatherModifier(position){
    const weather = await getForecast(position.coords.longitude, position.coords.latitude);
    const temperature = weather.temperature_2m;

    // calculate modifier based on temperature, at 0 degrees the modifier is 0.2 and at 30 degrees the modifier is 2
    let modifier = 1;
    if(temperature < 0){
        modifier = 0.2;
    } else if(temperature > 30){
        modifier = 2;
    } else {
        modifier = 0.2 + (temperature / 30);
    }
}