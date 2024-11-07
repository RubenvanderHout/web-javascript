export function MixingHallPage() {
    const html = `
        <h1>Hello world!</h1>
    `;
    const range = document.createRange();
    const fragment = range.createContextualFragment(html);

    return fragment;
}
