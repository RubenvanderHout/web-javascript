import { NavigationComponent } from "./components/Navigation.js";
import { createComponent } from "./utils/utils.js";
import { IngredientListComponent } from "./components/IngredientList.js";

export function App() {
  const html = `
        <nav></nav>

        <div class="content">
            <main class="main">
                <div id="router-container" class="page-container">
                </div>
            </main>

            <aside class="sidebar">
              <ingredient-list></ingredient-list>
            </aside>
        </div>
    `;
  const range = document.createRange();
  const fragment = range.createContextualFragment(html);

  // Use the createComponent function to render components
  createComponent(NavigationComponent, fragment.querySelector("nav"));
  createComponent(IngredientListComponent,fragment.querySelector("ingredient-list"));

  return fragment
}
