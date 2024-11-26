import { MixingMachineComponent } from "./MixingMachine.js";

export function MixingMachineList() {

    const html = `
        <button>Add mixingMachine</button>

        <div class="mixingmachine-list">

        </div>
    `;

    const range = document.createRange();
    const fragment = range.createContextualFragment(html);

    const MAX_MIXINGMACHINES = 3

    const addButton = fragment.querySelector("button")
    const mixingMachineList = fragment.querySelector(".mixingmachine-list")

    addButton.addEventListener("click", () => {
        const currentLength = mixingMachineList.children.length
        console.log(currentLength)
        if (MAX_MIXINGMACHINES === currentLength) {
            return;
        }
        mixingMachineList.append(MixingMachineComponent());
    });

    return fragment;
}