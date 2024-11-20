// @ts-nocheck
import { generateRandomId, reactive, computed } from "../utils/utils.js";

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

        return false;
    });

    return fragment;
}