import { generateRandomId } from "../utils/utils.js";

export function MixingPotComponent() {

    const randomCode = generateRandomId();

    const html = `
        <div class="error hidden"></div>
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

        // @ts-ignore
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

        // @ts-ignore
        if (mixingPotContent.children.length > 0) {
            // @ts-ignore
            const firstIngredient = mixingPotContent.children[0];
            // @ts-ignore
            const firstIngredientMixingSpeed = firstIngredient.getAttribute('mixingspeed');
            // @ts-ignore
            const draggedElementMixingSpeed = droppedElement.getAttribute('mixingspeed');

            if (firstIngredientMixingSpeed !== draggedElementMixingSpeed) {
                return false;
            }
        }

        return true;
    }


    mixingPotHandle.addEventListener('dragstart', (event) => {
        // @ts-ignore
        mixingPot.style.setProperty('opacity', '0.4');

        const mixingPotId= mixingPot.getAttribute('id');
        console.log(mixingPotId);
        // @ts-ignore
        event.dataTransfer.effectAllowed = 'copy';
        // @ts-ignore
        event.dataTransfer.clearData();
        // @ts-ignore
        event.dataTransfer.setData('text/plain', mixingPotId);

        return false;
    })



    mixingPotHandle.addEventListener('dragend', (event) => {
        // @ts-ignore
        mixingPot.style.setProperty("opacity", "1");
        return false;
    })

    return fragment;
}