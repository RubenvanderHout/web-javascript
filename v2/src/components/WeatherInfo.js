import { currentWeatherInfo, searchLocations, setCurrentLocation } from "../services/weatherservice.js";
import { debounce, generateRandomId } from "../utils/utils.js";

export function WeatherInfoComponent() {

  const id = generateRandomId();

  const cityId = `city-${id}`;
  const longitudeId = `longitude-${id}`;
  const latitudeId = `latitide-${id}`;
  const temperatureId = `temperature-${id}`
  const precipitationId = `precipitation-${id}`

  // console.log(currentWeatherInfo.value);

  const html = `
    <h1>Weather & location settings</h1>

    <h3>Search locations</h3>

    <h4>Current location</h4>
    <h5 id="${cityId}">City: ${currentWeatherInfo?.value?.name} </h5>
    <h5 id="${longitudeId}">longitude ${currentWeatherInfo?.value?.longitude} </h5>
    <h5 id="${latitudeId}">latitude ${currentWeatherInfo?.value?.latitude} </h5>
    <h5 id="${temperatureId}">temperature ${currentWeatherInfo?.value?.temperature} </h5>
    <h5 id="${precipitationId}">precipitation ${currentWeatherInfo?.value?.precipitation} </h5>

    <button>Make it rain</button>
    <button>Make it 36°C</button>
    <button>Make it 9°C</button>

    <input type="text" id="location-search-bar" placeholder="Search for a location..." autocomplete="off">
    <div id="search-results" style="display: none;"></div>

    <form id="weather-debug">
        <fieldset>

        </fieldset>
    </form>
  `;
  const range = document.createRange();
  const fragment = range.createContextualFragment(html);

  const cityElement = fragment.getElementById(cityId);
  const longitudeElement = fragment.getElementById(longitudeId);
  const latitudeElement = fragment.getElementById(latitudeId);
  const temperatureElement = fragment.getElementById(temperatureId);
  const precipitationElement = fragment.getElementById(precipitationId);

  currentWeatherInfo.subscribe(() => {
    cityElement.innerHTML = `City: ${currentWeatherInfo.name}`;
    longitudeElement.innerHTML = `Longitude:  ${currentWeatherInfo.longitude}`;
    latitudeElement.innerHTML = `Latitude: ${currentWeatherInfo.latitude}`;
    temperatureElement.innerHTML = `Temperature:  ${currentWeatherInfo.temperature}`;
    precipitationElement.innerHTML = `Precipitation: ${currentWeatherInfo.precipitation}`;
  });

  const locationInput = fragment.getElementById("location-search-bar");
  const resultsContainer = fragment.getElementById('search-results');

  locationInput.addEventListener(
    "input",
    debounce(async (event) => {
      event.preventDefault();
      // @ts-ignore
      const cityName = event.target.value;
      console.log(cityName)
      if(!cityName){
        resultsContainer.style.display = "none";
        return;
      }
      const locations = await searchLocations(cityName);
      console.log(locations);
      displayResults(locations);
    }, 500)
  );

  function displayResults(results) {
        resultsContainer.innerHTML = '';
        results.forEach(result => {
            const listItem = document.createElement('li');
            listItem.classList.add('result-item');
            listItem.textContent = `${result.name}, ${result.country}, ${result.timezone}`;
            listItem.setAttribute('data-name', result.name);
            listItem.setAttribute('data-country', result.country);
            listItem.setAttribute('data-timezone', result.timezone);

            // Using the Popover API
            listItem.setAttribute('role', 'button');
            listItem.setAttribute('aria-describedby', `popover-${result.id}`);

            // Add click event to select the item
            listItem.addEventListener('click', function () {
              setCurrentLocation(result);
            });

            resultsContainer.appendChild(listItem);
        });

        resultsContainer.style.display = results.length > 0 ? 'block' : 'none';
    }

  return fragment;
}