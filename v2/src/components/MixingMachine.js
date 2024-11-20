// @ts-nocheck
import { generateRandomId, reactive, computed } from "../utils/utils.js";
import { getWeatherModifier } from "../utils/weather.js";
import { mixCMYK } from "../utils/colors.js";


export function MixingMachineComponent(){

    const id = "mixing-machine-" + generateRandomId();

    const mixingContents = reactive(["Water", "Flour"]);
    const mixingTooltip = computed(() => {
        if(mixingContents.length === 0){
            return "Empty";
        } else {
            return mixingContents.join(", ");
        }
    });

    const html = `
        <div id="${id}" class="mixing-machine">
            ${mixingTooltip.value}
        </div>
    `
    const range = document.createRange();
    const fragment = range.createContextualFragment(html);

    const mixingMachine = fragment.querySelector('.mixing-machine');

    mixingContents.subscribe(() => {
        console.log("Mixing contents changed!", mixingContents.value);
        mixingMachine.innerHTML = mixingTooltip.value;
    });

    mixingMachine.addEventListener('dragenter', (event) => {
        mixingMachine.classList.add('over');
    });

    mixingMachine.addEventListener('dragleave', (event) => {
        mixingMachine.classList.remove('over');
    });

    mixingMachine.addEventListener('hover', (event) => {
        event.preventDefault();

        // Show the current color


        return false;
    });

    mixingMachine.addEventListener('drop', (event) => {
        event.preventDefault();

        // @ts-ignore
        const draggedElementId = event.dataTransfer.getData("text");
        const draggedElement = document.getElementById(draggedElementId);

        mixingMachine.appendChild(draggedElement);

        mix(draggedElement);

        return false;
    });

    mixingMachine.addEventListener('dragover', (event) => {
        event.preventDefault();
        if(mixingContents.length > 0){
            return false;
        }
    });

    return fragment;
}

async function mix(mixingPot){
    // get highest mixingt time from all ingredients
    let mixingTime = 0;
    for(const ingredient of mixingPot.children){
        const ingredientMixingTime = ingredient.getAttribute("mixingTime");
        if(ingredientMixingTime > mixingTime){
            mixingTime = ingredientMixingTime;
        }
    }
    
    function getLocation() {
        if (navigator.geolocation) {
          const position = navigator.geolocation.getCurrentPosition();
        } else {
          x.innerHTML = "Geolocation is not supported by this browser.";
        }
      }
    // apply weather modifiers from api
    const weatherModifier = await getWeatherModifier(position);
    mixingTime *= weatherModifier;

    // set timer
    setTimeout(() => {
        // mix colors
        const cmyk = mixCMYK(mixingContents.value);
        const hsl = cmykToHSL(...cmyk);
        // empty mixing pot
        mixingPot.innerHTML = "";
        // create new color element
        const colorElement = document.createElement('div');
        colorElement.style.backgroundColor = `hsl(${hsl[0]} ${hsl[1]}% ${hsl[2]}%)`;
        mixingPot.appendChild(colorElement);
        // move mixing pot to output area
        const outputArea = document.getElementById('the-other-side');
        outputArea.appendChild(mixingPot);

    }, mixingTime);
}