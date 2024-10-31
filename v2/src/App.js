import { MixingHallPage } from "./pages/MixingHall.js";
import { NavigationComponent } from "./components/Navigation.js";
import { ColorTestPage } from "./pages/ColorTest.js";
import { createComponent } from "./utils/utils.js";

export function App(rootElement) {
    rootElement.innerHTML = `
        <h1>Future Colors Color simulator</h1>

        <nav></nav>

        <main>
            <mixing-hall id="mixing-hall-1"></mixing-hall>
            <mixing-hall id="mixing-hall-2"></mixing-hall>
            <color-test></color-test>
        </main>
    `;
    // Use the createComponent function to render components
    createComponent(NavigationComponent, document.querySelector("nav"));
    createComponent(MixingHallPage, document.getElementById('mixing-hall-1'));
    createComponent(MixingHallPage, document.getElementById('mixing-hall-2'));
    createComponent(ColorTestPage, document.querySelector('color-test'));
}
