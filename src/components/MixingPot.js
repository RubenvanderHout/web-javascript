import { generateRandomId } from "../utils/utils.js";

export function MixingPotComponent() {

    const randomCode = generateRandomId();

    const html = `
        <div id="mixingpot-${randomCode}" class="mixingpot rectangle draggable="true"">
            <div class="mixingpot-handle" draggable="true"></div>
            <div class="mixingpot-content"></div>
        </div>
    `;
    const range = document.createRange();
    const fragment = range.createContextualFragment(html);

    const mixingPot = fragment.querySelector('.mixingpot');
    const mixingPotContent = fragment.querySelector('.mixingpot-content');
    const mixingPotHandle = fragment.querySelector('.mixingpot-handle');

    // Show you can drop on the mixing pot
    mixingPotContent.addEventListener('dragover', (event) => {
        event.preventDefault();
    });

    mixingPotContent.addEventListener('dragenter', (event) => {
        mixingPotContent.classList.add('over');
    });

    mixingPotContent.addEventListener('dragleave', (event) => {
        mixingPotContent.classList.remove('over');
    });

    mixingPotContent.addEventListener('drop', (event) => {
        event.preventDefault();

        const draggedElementId = event.dataTransfer.getData("text/plain");
        const draggedElement = document.getElementById(draggedElementId);

        console.log(draggedElement);

        if (canDropItemsInside(draggedElement)) {
            mixingPotContent.appendChild(draggedElement);
        }
    })


    function canDropItemsInside(droppedElement) {

        if (!droppedElement.classList.contains('shape')) {
            return false;
        }

        if (mixingPotContent.children.length > 0) {
            const firstIngredient = mixingPotContent.children[0];
            const firstIngredientMixingSpeed = firstIngredient.getAttribute('mixingspeed');
            const draggedElementMixingSpeed = droppedElement.getAttribute('mixingspeed');

            if (firstIngredientMixingSpeed !== draggedElementMixingSpeed) {
                return false;
            }
        }

        return true;
    }


    mixingPotHandle.addEventListener('dragstart', (event) => {
        mixingPot.style.setProperty('opacity', '0.4');

        const mixingPotId= mixingPot.getAttribute('id');
        console.log(mixingPotId);
        event.dataTransfer.effectAllowed = 'copy';
        event.dataTransfer.clearData();
        event.dataTransfer.setData('text/plain', mixingPotId);

        return false;
    })



    mixingPotHandle.addEventListener('dragend', (event) => {
        mixingPot.style.setProperty("opacity", "1");
        return false;
    })

    return fragment;
}