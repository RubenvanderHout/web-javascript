/**
 * @param {Element} refElement
 */
export function IngredientListComponent(refElement) {
    const html = `
        <h1>Ingredient List!</h1>
        <button id="add-ingredient">Add Ingredient</button>
    `;
    const range = document.createRange();
    const fragment = range.createContextualFragment(html);

    const addButton = fragment.querySelector("#add-ingredient");

    addButton.addEventListener("click", () => {

    });







    return fragment;

}