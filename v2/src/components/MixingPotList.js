import { MixingPotComponent } from "./MixingPot.js";

export function MixingPotListComponent() {
    const html = `
        <button>Add mixingpot</button>

        <div class="mixingpot-list">

        </div>
    `;
    const range = document.createRange();
    const fragment = range.createContextualFragment(html);

    const MAX_MIXINGPOTS = 6

    const addButton = fragment.querySelector("button")
    const mixingPotList = fragment.querySelector(".mixingpot-list")

    addButton.addEventListener("click", () => {
        // really fragile code uses the childeren and mixingpot has 2 divs
        // so double the MAX
        const currentLength = mixingPotList.children.length

        console.log(currentLength)
        if(MAX_MIXINGPOTS === currentLength){
            return;
        }
        mixingPotList.append(MixingPotComponent());
    });






    return fragment;
}