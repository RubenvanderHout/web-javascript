// @ts-nocheck
import { generateRandomId } from "../utils/utils.js";

export function MixingPotComponent() {
    const randomCode = generateRandomId();

    const html = `
        <div id="mixingpot-${randomCode}" class="mixingpot rectangle">

        </div>
    `;
    const range = document.createRange();
    const fragment = range.createContextualFragment(html);

    const mixingPot = fragment.querySelector('div');

    // Show you can drop on the mixing pot
    mixingPot.addEventListener('dragover', (event) => {
        event.preventDefault();
        // if the mixingpot already contains ingredients, the new ingredient must match the mixingspeed of the first ingredient
        if (mixingPot.children.length > 0) {
            // @ts-ignore
            const firstIngredient = mixingPot.children[0];
            // @ts-ignore
            const firstIngredientMixingSpeed = firstIngredient.getAttribute('mixingspeed');
            // @ts-ignore
            const draggedElementMixingSpeed = event.dataTransfer.getData('mixingspeed');
            if (firstIngredientMixingSpeed !== draggedElementMixingSpeed) {
                return false;
            }
        }

        return false;
    });

    mixingPot.addEventListener('dragenter', (event) => {
        mixingPot.classList.add('over');
    });

    mixingPot.addEventListener('dragleave', (event) => {
        mixingPot.classList.remove('over');
    });

    mixingPot.addEventListener('drop', (event) => {
        event.preventDefault();

        // @ts-ignore
        const draggedElementId = event.dataTransfer.getData("text");
        const draggedElement = document.getElementById(draggedElementId);

        mixingPot.appendChild(draggedElement);

        return false;
    })

    mixingPot.addEventListener('dragstart', (event) => {
        event.preventDefault();
        mixingPot.style.setProperty('opacity', '0.4');
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.clearData();
        // @ts-ignore
        event.dataTransfer.setData('text/plain', event.target.id);

        return false;
    })

    mixingPot.addEventListener('dragend', (event) => {
        event.preventDefault();
        mixingPot.style.setProperty("opacity", "1");
        return false;
    })



    return fragment;
}