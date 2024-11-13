import { NavigationComponent } from "./components/Navigation.js";
import { createComponent } from "./utils/utils.js";
import { IngredientListComponent } from "./components/IngredientList.js";
import { IngredientComponent } from "./components/Ingredient.js";

export function App() {
  const html = `
        <nav></nav>

        <main style="display: grid; grid-template-columns: 90vw 10vw;">
            <div id="router-container" class="page-container">
                <mixing-hall id="mixing-hall-1"></mixing-hall>
                <mixing-hall id="mixing-hall-2"></mixing-hall>
                <color-test></color-test>
                <dropable id="dropable-1"></dropable>
            </div>

            <div style="height: 90vh; background: hsl(150deg 30% 60%);">
                <ingredient-list></ingredient-list>

                <dragable id="dragable-1"></dragable>
                <dragable id="dragable-2"></dragable>
                <dragable id="dragable-3"></dragable>
            </div>

        </main>
    `;
  const range = document.createRange();
  const fragment = range.createContextualFragment(html);

  // Use the createComponent function to render components
  createComponent(NavigationComponent, fragment.querySelector("nav"));

  createComponent(
    IngredientListComponent,
    fragment.querySelector("ingredient-list")
  );

  createComponent(IngredientComponent, fragment.getElementById("dragable-1"));
  createComponent(IngredientComponent, fragment.getElementById("dragable-2"));
  createComponent(IngredientComponent, fragment.getElementById("dragable-3"));

  return fragment
}
