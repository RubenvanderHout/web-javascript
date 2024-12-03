import { MixingMachineList } from "../components/mixingMachineList.js";
import { computed, createComponent } from "../utils/utils.js";
import { MixingPotListComponent } from "../components/MixingPotList.js";

export function MixingHallPage() {
    const html = `
        <div class="mixing-hall">
            <h1>Mixing Hall!</h1>

            <div class="mixing-seperator">
                <div class="mixingpot-container">
                    <mixingpot-list></mixingpot-list>
                </div>

                <div class="mixingmachine-container">
                    <mixingmachine-list></mixingmachine-list>
                </div>
            </div>
        </div>
    `;
    const range = document.createRange();
    const fragment = range.createContextualFragment(html);

    createComponent(MixingPotListComponent, fragment.querySelector('mixingpot-list'));
    createComponent(MixingMachineList, fragment.querySelector('mixingmachine-list'));

    return fragment;
}
