import { createObservable } from "../utils/utils.js";

export function ColorTestPage() {
    const html = `
        <div page-type="Color Test" >
            <h1>Color Test!</h1>
        </div>
    `;
    const range = document.createRange();
    const fragment = range.createContextualFragment(html);

    return fragment;
}