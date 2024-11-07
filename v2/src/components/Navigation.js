/**
 * @param {Element} refElement
 */
export function NavigationComponent(refElement) {
    const html = `
        <h1>Hello world!</h1>
    `;
    const range = document.createRange();
    const fragment = range.createContextualFragment(html);

    return fragment;
}
