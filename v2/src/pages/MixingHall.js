import { MixingPotComponent } from "../components/MixingPot.js";
import { MixingMachineComponent } from "../components/MixingMachine.js";

export function MixingHallPage() {
    const html = `
        <div>
            <h1>Mixing Hall!</h1>

            <div class="mixingHallContainer">

            </div>
        </div>
    `;
    const range = document.createRange();
    const fragment = range.createContextualFragment(html);

    const container = fragment.querySelector('.mixingHallContainer');

    container.appendChild(MixingPotComponent());
    container.appendChild(MixingMachineComponent());






    return fragment;
}
