import { searchLocations } from "../services/weatherservice.js";
import { debounce } from "../utils/utils.js";

export function WeatherInfoComponent() {
  const html = `
    <h1>Weather & location settings</h1>

    <h3>Search locations</h3>
    <input type="text" id="location-search-bar" placeholder="Search for a location..." autocomplete="off">
    <div id="search-results" style="display: none;"></div>

    <form id="weather-debug">
        <fieldset>

        </fieldset>
    </form>
`;
  const range = document.createRange();
  const fragment = range.createContextualFragment(html);

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
            listItem.textContent = `${result.name}, ${result.country}`;
            listItem.setAttribute('data-name', result.name);
            listItem.setAttribute('data-country', result.country);
            listItem.setAttribute('data-timezone', result.timezone);

            // Using the Popover API
            listItem.setAttribute('role', 'button');
            listItem.setAttribute('aria-describedby', `popover-${result.id}`);
            listItem.addEventListener('mouseenter', function () {
                const popover = document.createElement('div');
                popover.classList.add('popover');
                popover.id = `popover-${result.id}`;
                popover.textContent = `Timezone: ${result.timezone}`;
                listItem.appendChild(popover);
            });

            listItem.addEventListener('mouseleave', function () {
                const popover = document.getElementById(`popover-${result.id}`);
                if (popover) {
                    popover.remove();
                }
            });

            // Add click event to select the item
            listItem.addEventListener('click', function () {
                alert(`Selected: ${result.name}, ${result.country}`);
            });

            resultsContainer.appendChild(listItem);
        });

        resultsContainer.style.display = results.length > 0 ? 'block' : 'none';
    }

  return fragment;
}