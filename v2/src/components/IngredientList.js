import { RandomIngredientComponent } from "./RandomIngredient.js";
import { debounce } from "../utils/utils.js";

export function IngredientListComponent() {
    const html = `
        <h1>Ingredient List!</h1>
        <button class="add-ingredient">Add Ingredient</button>

        <ul class="ingredientList">

        </ul>
    `;
    const range = document.createRange();
    const fragment = range.createContextualFragment(html);

    const ingredientListElement = fragment.querySelector(".ingredientList")
    const addButtonElement = fragment.querySelector(".add-ingredient");

    addButtonElement.addEventListener("click", debounce(addNewRandomIngredient, 200));

    function addNewRandomIngredient(){
        const RandomIngredient = RandomIngredientComponent();
        ingredientListElement.appendChild(RandomIngredient);
    }

    return fragment;
}