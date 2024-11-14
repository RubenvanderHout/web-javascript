export function ColorTestPage() {
    const html = `
        <div>
            <h1>Color Test!</h1>
        </div>
    `;
    const range = document.createRange();
    const fragment = range.createContextualFragment(html);

    return fragment;
}