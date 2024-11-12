/**
 * @param {Element} refElement
 */
export function NavigationComponent(refElement) {
    const html = `
        <nav style="background: hsl(206 100% 83%); width: 100vw;">
            <h1>Future Colors - Color simulator</h1>
            <ul class="horizontal-list">
                <li><a href="#mixing-hall-1">Mixing Hall 1</a></li>
                <li><a href="#mixing-hall-2">Mixing Hall 2</a></li>
                <li><a href="#color-test">Color Testing Hall</a></li>
            </ul>
        </nav>
    `;
    const range = document.createRange();
    const fragment = range.createContextualFragment(html);

    return fragment;
}
