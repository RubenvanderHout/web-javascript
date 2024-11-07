import { createObservable } from "../utils/utils.js";

/**
 * @param {Element} refElement
 */
export function IngredientListComponent(refElement) {
    const html = `
        <h1>Ingredient List!</h1>
    `;
    const range = document.createRange();
    const fragment = range.createContextualFragment(html);

    return fragment;

}