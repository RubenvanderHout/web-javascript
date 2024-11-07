/**
 * @param {Element} refElement
 */
export function NavigationComponent(refElement) {
    const html = `
        <nav></nav>
    `;
    const range = document.createRange();
    const fragment = range.createContextualFragment(html);

    return fragment;
}
