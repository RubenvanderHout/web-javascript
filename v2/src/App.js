import { MixingHallPage } from "./pages/MixingHall.js";
import { NavigationComponent } from "./components/Navigation.js";
import { ColorTestPage } from "./pages/ColorTest.js";
import { createComponent } from "./utils/utils.js";
import { IngredientListComponent } from "./components/IngredientList.js";
import { DropableComponent } from "./components/Dropable.js";
import { IngredientComponent } from "./components/Ingredient.js";

export function App() {
  const html = `
        <nav></nav>

        <main style="display: grid; grid-template-columns: 90vw 10vw;">
            <div id="router-container" class="page-container">

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

  // // Use the createComponent function to render components
  createComponent(NavigationComponent, fragment.querySelector("nav"));
  // createComponent(MixingHallPage, fragment.getElementById("mixing-hall-1"));
  // createComponent(MixingHallPage, fragment.getElementById("mixing-hall-2"));
  // createComponent(ColorTestPage, fragment.querySelector("color-test"));

  createComponent(
    IngredientListComponent,
    fragment.querySelector("ingredient-list")
  );

  // createComponent(DropableComponent, fragment.getElementById("dropable-1"));

  // createComponent(IngredientComponent, fragment.getElementById("dragable-1"));
  // createComponent(IngredientComponent, fragment.getElementById("dragable-2"));
  // createComponent(IngredientComponent, fragment.getElementById("dragable-3"));


  return fragment
}
