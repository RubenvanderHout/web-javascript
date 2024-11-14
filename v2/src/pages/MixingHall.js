import { MixingPotComponent } from "../components/MixingPot.js";

export function MixingHallPage() {
    const html = `
        <div>
            <h1>Mixing Hall!</h1>
        </div>
    `;
    const range = document.createRange();
    const fragment = range.createContextualFragment(html);

    const div = fragment.querySelector('div');

    div.appendChild(MixingPotComponent());




    return fragment;
}
