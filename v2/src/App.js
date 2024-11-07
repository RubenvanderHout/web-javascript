import { MixingHallPage } from "./pages/MixingHall.js";
import { NavigationComponent } from "./components/Navigation.js";
import { ColorTestPage } from "./pages/ColorTest.js";
import { createComponent } from "./utils/utils.js";
import { IngredientListComponent } from "./components/IngredientList.js";
import { DropableComponent } from "./components/dropable.js";
import { DragableComponent } from "./components/dragable.js";

export function App(rootElement) {
    rootElement.innerHTML = `
        <h1>Future Colors Color simulator</h1>

        <nav></nav>

        <main style="display: grid; grid-template-columns: 90vw 10vw;">
            <div style="height: 100vh; background: hsl(0 80% 50% / 25%);">
                <mixing-hall id="mixing-hall-1"></mixing-hall>
                <mixing-hall id="mixing-hall-2"></mixing-hall>
                <color-test></color-test>
            </div>

            <div style="height: 100vh; background: hsl(150deg 30% 60%);">
                <ingredient-list></ingredient-list>
            </div>

            <div id="dropable-1">

            </div>

            <div id="dragable-1"></div>
            <h1>Hello world!</h1>
            <div id="dragable-2"></div>
            <div id="dragable-3"></div>
        </main>
    `;
    // Use the createComponent function to render components
    createComponent(NavigationComponent, document.querySelector("nav"));
    createComponent(MixingHallPage, document.getElementById('mixing-hall-1'));
    createComponent(MixingHallPage, document.getElementById('mixing-hall-2'));
    createComponent(ColorTestPage, document.querySelector('color-test'));
    createComponent(IngredientListComponent, document.querySelector('ingredient-list'));

    createComponent(DropableComponent, document.getElementById('dropable-1'));

    createComponent(DragableComponent, document.getElementById('dragable-1'));
    createComponent(DragableComponent, document.getElementById('dragable-2'));
    createComponent(DragableComponent, document.getElementById('dragable-3'));
}
