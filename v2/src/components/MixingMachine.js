// @ts-nocheck
import { generateRandomId, reactive, computed } from "../utils/utils.js";
import { getWeatherModifier } from "../utils/weather.js";
import { hslToCMYK, mixCMYK, cmykToHSL, cmykToRGB, hslToRGB } from "../utils/colors.js";


export function MixingMachineComponent(){

    const id = "mixingmachine-" + generateRandomId();
    
    const html = `
        <div id="mixing-machine-${id}" class="mixing-machine">
        </div>
    `
    const range = document.createRange();
    const fragment = range.createContextualFragment(html);

    const mixingMachine = fragment.querySelector('.mixing-machine');

    mixingMachine.addEventListener('dragenter', (event) => {
        mixingMachine.classList.add('over');
    });

    mixingMachine.addEventListener('dragleave', (event) => {
        mixingMachine.classList.remove('over');
    });

   
    mixingMachine.addEventListener('drop', (event) => {
        event.preventDefault();

        if(mixingMachine.children.length > 1){
            console.log("Can't mix more than one pot at a time");
            return false;
        }
        // @ts-ignore
        const mixingPotId = event.dataTransfer.getData("text/plain");
        if(!/^mixingpot-/.test(mixingPotId)){
            return false;
        }

        const mixingPot = document.getElementById(mixingPotId);

        mixingMachine.appendChild(mixingPot);
        mix(mixingPot);

        return false;
    });

    mixingMachine.addEventListener('dragover', (event) => {
        event.preventDefault();
    });

    return fragment;
}

async function mix(mixingPot){
    // get highest mixingt time from all ingredients
    let mixingTime = 0;
    const mixingPotContent = mixingPot.querySelector(".mixingpot-content");
    const ingredients = mixingPotContent.children;
    for(const ingredient of ingredients){
        const ingredientMixingTime = ingredient.getAttribute("mixingTime");
        if(ingredientMixingTime > mixingTime){
            mixingTime = ingredientMixingTime;
        }
    }


    //TODO: get weather modifier
    // function getLocation() {
    //     if (navigator.geolocation) {
    //       const position = navigator.geolocation.getCurrentPosition();
    //     } else {
    //       x.innerHTML = "Geolocation is not supported by this browser.";
    //     }
    // }


    // // apply weather modifiers from api
    // const weatherModifier = await getWeatherModifier(position);
    // mixingTime *= weatherModifier;

    // set timer
    setTimeout(() => {
        // mix colors
        let colourArray = [];

        //get hsl from each ingredient and convert to rgb
        for(const ingredient of ingredients){
            const color = ingredient.getAttribute("color");
            //split the hsl string into seperate values hsl(101, 74%, 88%) => [101, 74, 88]
            const hsl = color.match(/\d+/g).map(Number);
            const rgb = hslToRGB(hsl[0], hsl[1], hsl[2]);
            colourArray.push(rgb);
        }

        console.log("Mixing colors!", colourArray);

        const cmyk = mixCMYK(colourArray);
        console.log("Mixed colors cmyk!", cmyk);
        const hsl = cmykToHSL(cmyk[0], cmyk[1], cmyk[2], cmyk[3]);
        // empty mixing pot
        mixingPotContent.innerHTML = "";
        // create new color element
        const colorElement = document.createElement('div');
        colorElement.style.backgroundColor = `hsl(${hsl[0]} ${hsl[1]}% ${hsl[2]}%)`;
        colorElement.style.width = "50px";
        colorElement.style.height = "50px";
        mixingPotContent.appendChild(colorElement);
        // move mixing pot to output area
        const outputArea = document.getElementById('the-other-side');
        outputArea.appendChild(mixingPot);

    }, mixingTime);
}