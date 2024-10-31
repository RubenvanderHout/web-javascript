import { createObservable } from "./utils/utils.js";

export function App() {
    const appElement = document.createElement("div");

    document.body.innerHTML = `
        <div>
            <p>
            Count:
            <span data-bind="count"></span>
            </p>
            <button id="increment">Increment</button>
            <button id="decrement">Decrement</button>
        </div>
    `;

    const countObservable = createObservable(0);
    countObservable.bindToElements("count", "textContent");

    const buttonIncrement = document.getElementById("increment");
    const buttonDecrement = document.getElementById("decrement");

    buttonIncrement.addEventListener("click", () => {
        countObservable.setValue(countObservable.getValue() + 1);
    });

    buttonDecrement.addEventListener("click", () => {
        countObservable.setValue(countObservable.getValue() - 1);
    });

    return appElement;
}
