import { createObservable } from "../utils/utils.js";

export function ColorTestPage() {
    const html = `
        <h1>Hello world!</h1>
    `;
    const range = document.createRange();
    const fragment = range.createContextualFragment(html);

    return fragment;
}