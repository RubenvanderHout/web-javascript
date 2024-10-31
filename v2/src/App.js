import { MixingHallPage } from "./pages/MixingHall.js";
import { NavigationComponent } from "./components/Navigation.js";
import { ColorTestPage } from "./pages/ColorTest.js";

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
    // Declare elements
    const navigationElement = document.querySelector("nav");
    const colorTestElement = document.querySelector('color-test');

    const mixingHallElement1 = document.getElementById('mixing-hall-1');
    const mixingHallElement2 = document.getElementById('mixing-hall-2');

    // Render Components
    NavigationComponent(navigationElement);
    MixingHallPage(mixingHallElement1);
    MixingHallPage(mixingHallElement2);
    ColorTestPage(colorTestElement)
}
