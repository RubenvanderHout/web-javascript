import { createObservable } from "../utils/utils.js";

export function HallPage() {
    const appElement = document.createElement("div");

    document.body.innerHTML = `
        <p>
            Count:
            <span data-bind="count"></span>
        </p>
        <button id="increment">Increment</button>
        <button id="decrement">Decrement</button>
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
