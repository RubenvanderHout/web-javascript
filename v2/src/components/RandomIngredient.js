// @ts-nocheck
import { generateRandomId } from "../utils/utils.js";
import { IngredientComponent } from "./Ingredient.js";
import { generateHSL } from "../utils/colors.js";

export function RandomIngredientComponent() {

    function generateProperties() {
        const color = generateHSL();

    }

    return IngredientComponent();
}