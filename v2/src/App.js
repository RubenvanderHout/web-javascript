import { NavigationComponent } from "./components/Navigation.js";
import { createComponent } from "./utils/utils.js";
import { IngredientListComponent } from "./components/IngredientList.js";

export function App() {
  const html = `
        <nav></nav>

        <main style="display: grid; grid-template-columns: 90vw 10vw;">
            <div id="router-container" class="page-container">

            </div>

            <div style="height: 90vh; background: hsl(150deg 30% 60%);">
                <ingredient-list></ingredient-list>

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

  return fragment
}
