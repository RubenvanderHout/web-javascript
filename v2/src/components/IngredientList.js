import { RandomIngredientComponent } from "./RandomIngredient.js";
import { debounce } from "../utils/utils.js";
import { IngredientComponent } from "./Ingredient.js";

export function IngredientListComponent() {
    const html = `
        <h1>Ingredient List!</h1>
        <button class="add-ingredient">Add Ingredient</button>
        <button id="cmykIngredientsButton">Base CMYK Ingredients</button>


        <ul class="ingredientList">

        </ul>
    `;
    const range = document.createRange();
    const fragment = range.createContextualFragment(html);

    const ingredientListElement = fragment.querySelector(".ingredientList")
    const addButtonElement = fragment.querySelector(".add-ingredient");
    const cmykIngredientsButton = fragment.querySelector("#cmykIngredientsButton");

    addButtonElement.addEventListener("click", debounce(addNewRandomIngredient, 200));
    cmykIngredientsButton.addEventListener("click", debounce(addBaseCMYKIngredients, 200));

    function addNewRandomIngredient(){
        const RandomIngredient = RandomIngredientComponent();
        ingredientListElement.appendChild(RandomIngredient);
    }

    function addBaseCMYKIngredients(){
        const shape = ` 
        width: 50px;
        height: 50px;
        border-radius: 50%;
        `
        let c = IngredientComponent({
            mixingTime: 1000,
            mixingSpeed: 1,
            color: "hsl(180, 100%, 50%)",
            texture: "grain",
            shape: shape
        });
        
        let m = IngredientComponent({
            mixingTime: 1000,
            mixingSpeed: 1,
            color: "hsl(300, 100%, 50%)",
            texture: "grain",
            shape: shape
        });

        let y = IngredientComponent({
            mixingTime: 1000,
            mixingSpeed: 1,
            color: "hsl(60, 100%, 50%)",
            texture: "grain",
            shape: shape
        });

        let k = IngredientComponent({
            mixingTime: 1000,
            mixingSpeed: 1,
            color: "hsl(0, 0%, 0%)",
            texture: "grain",
            shape: shape
        });

        ingredientListElement.appendChild(c);
        ingredientListElement.appendChild(m);
        ingredientListElement.appendChild(y);
        ingredientListElement.appendChild(k);
    
    }



    return fragment;
}